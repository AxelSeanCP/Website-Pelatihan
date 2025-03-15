const {
  createCertificate,
  getCertificate,
  getCertificates,
  removeCertificate,
} = require("../services/CertificateService");
const CertificatesValidator = require("../validators/certificates");

class CertificateController {
  async create(req, res, next) {
    try {
      CertificatesValidator.validateCertificatePayload(req.body);

      const certificate = await createCertificate(req.body);
      res.status(201).json({
        status: "success",
        message: "certificate created",
        data: {
          certificate,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { certificateId } = req.params;
      const certificate = await getCertificate(certificateId);

      res.status(200).json({
        status: "success",
        data: {
          certificate,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMultiple(req, res, next) {
    try {
      res
        .status(200)
        .json({ status: "success", data: await getCertificates() });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { certificateId } = req.params;

      await removeCertificate(certificateId);

      res.status(200).json({
        status: "success",
        message: "Certificate deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CertificateController();
