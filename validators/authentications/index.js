const { BadRequestError } = require("../../exceptions");
const { LoginPayloadSchema, AuthenticationPayloadSchema } = require("./schema");

const AuthenticationsValidator = {
  validateLoginPayload: (payload) => {
    const validationResult = LoginPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.message);
    }
  },

  validateAuthenticationPayload: (payload) => {
    const validationResult = AuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
