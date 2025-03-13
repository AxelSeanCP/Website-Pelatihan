const { CertificatePayloadSchema } = require("./schema");
const { BadRequestError } = require("../../exceptions");

const CertificatesValidator = {
  validateCertificatePayload: (payload) => {
    const validationResult = CertificatePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.message);
    }
  },
};

module.exports = CertificatesValidator;
