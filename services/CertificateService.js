const db = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const puppeteer = require("puppeteer");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { BadRequestError, NotFoundError } = require("../exceptions");

const checkCertificateExists = async ({ userId, courseId }) => {
  const certificate = await db.Certificate.findOne({
    where: {
      [Op.and]: [{ userId }, { courseId }],
    },
  });

  if (certificate) {
    throw new BadRequestError("User already have this certificate");
  }
};

const createCertificate = async ({ userId, courseId, courseName }) => {
  await checkCertificateExists({ userId, courseId });

  const user = await db.User.findByPk(userId);
  if (!user) throw new NotFoundError("User not found");

  const certificateId = uuidv4();
  const verificationUrl = `http://${process.env.HOST}:${process.env.PORT}/certificates/${certificateId}/verify`;

  const qrCodeDir = path.join(__dirname, "../public/qrcodes");
  const pdfDir = path.join(__dirname, "../public/certificates");
  if (!fs.existsSync(qrCodeDir)) fs.mkdirSync(qrCodeDir, { recursive: true });
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

  const qrCodePath = path.join(qrCodeDir, `${certificateId}.png`);
  await QRCode.toFile(qrCodePath, verificationUrl);

  const qrCodeBase64 = fs.readFileSync(qrCodePath).toString("base64");
  const qrCodeDataUri = `data:image/png;base64,${qrCodeBase64}`;

  const pdfPath = path.join(pdfDir, `${certificateId}.pdf`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const certificateHtml = `
      <html>
      <body style="text-align:center; font-family:Arial, sans-serif;">
        <h1>Certificate of Completion</h1>
        <p>This is to certify that</p>
        <h2>${user.name}</h2>
        <p>has successfully completed the course</p>
        <h3>${courseName}</h3>
        <p>Certificate ID: ${certificateId}</p>
        <img src="${qrCodeDataUri}" width="150" />
      </body>
      </html>
    `;

  await page.setContent(certificateHtml);
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  const certificate = await db.Certificate.create({
    id: certificateId,
    userId,
    courseId,
    courseName,
    pdfUrl: `/certificates/${certificateId}.pdf`,
  });

  return certificate;
};

const getCertificate = async (id) => {
  const certificate = await db.Certificate.findByPk(id, {
    include: [{ model: db.User, as: "user", attributes: ["name"] }],
  });

  if (!certificate) {
    throw new NotFoundError("Certificate not found. Invalid certificate id");
  }

  return certificate;
};

const getCertificates = async () => {
  const certificates = await db.Certificate.findAll({
    include: [{ model: db.User, as: "user", attributes: ["name"] }],
  });

  if (certificates.length === 0) {
    throw new NotFoundError("No certificates found");
  }

  return { certificates };
};

const removeCertificate = async (id) => {
  const certificate = await db.Certificate.findByPk(id);

  if (!certificate) {
    throw new NotFoundError("Certificate not found");
  }

  const pdfPath = path.join(__dirname, `../public/certificates/${id}.pdf`);
  const qrCodePath = path.join(__dirname, `../public/qrcodes/${id}.png`);

  if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
  if (fs.existsSync(qrCodePath)) fs.unlinkSync(qrCodePath);

  await certificate.destroy();
};

module.exports = {
  createCertificate,
  getCertificate,
  getCertificates,
  removeCertificate,
};
