const { add, getById } = require("../services/CertificateService");
const CertificatesValidator = require("../validators/certificates");

class CertificateController {
  async create(req, res, next) {
    try {
      CertificatesValidator.validateCertificatePayload(req.body);

      const certificate = await add(req.body);
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
      const certificate = await getById(certificateId);

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
}

module.exports = new CertificateController();
