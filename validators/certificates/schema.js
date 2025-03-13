const Joi = require("joi");

const CertificatePayloadSchema = Joi.object({
  userId: Joi.string().required(),
  courseId: Joi.string().required(),
  courseName: Joi.string().required(),
});

module.exports = { CertificatePayloadSchema };
