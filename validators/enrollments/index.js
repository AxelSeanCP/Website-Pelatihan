const { BadRequestError } = require("../../exceptions");
const { EnrollmentPayloadSchema } = require("./schema");

const EnrollmentsValidator = {
  validateEnrollmentPayload: (payload) => {
    const validationResult = EnrollmentPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.message);
    }
  },
};

module.exports = EnrollmentsValidator;
