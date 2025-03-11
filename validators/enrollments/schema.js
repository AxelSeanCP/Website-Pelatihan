const Joi = require("joi");

const EnrollmentPayloadSchema = Joi.object({
  courseId: Joi.string().required(),
});

module.exports = { EnrollmentPayloadSchema };
