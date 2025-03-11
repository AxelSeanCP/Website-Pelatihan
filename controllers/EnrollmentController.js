const EnrollmentsValidator = require("../validators/enrollments");
const {
  createEnrollment,
  getEnrollments,
} = require("../services/EnrollmentService.js");

class EnrollmentController {
  async create(req, res, next) {
    try {
      EnrollmentsValidator.validateEnrollmentPayload(req.body);
      const { id } = req.credentials;
      const { courseId } = req.credentials;
      await createEnrollment({ id, courseId });
      res.status(201).json({ status: "success", message: "User enrolled" });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.credentials;
      res
        .status(200)
        .json({ status: "success", data: await getEnrollments(id) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EnrollmentController();
