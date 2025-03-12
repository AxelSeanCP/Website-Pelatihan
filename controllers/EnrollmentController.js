const EnrollmentsValidator = require("../validators/enrollments");
const {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
  verifyEnrollmentAccess,
} = require("../services/EnrollmentService.js");

class EnrollmentController {
  async create(req, res, next) {
    try {
      EnrollmentsValidator.validateEnrollmentPayload(req.body);
      const { id } = req.credentials;
      const { courseId } = req.body;
      const enrollmentId = await createEnrollment({ id, courseId });
      res
        .status(201)
        .json({
          status: "success",
          message: "User enrolled",
          data: { enrollmentId },
        });
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

  async delete(req, res, next) {
    try {
      EnrollmentsValidator.validateEnrollmentPayload(req.body);
      const { courseId } = req.body;
      const { id: userId } = req.credentials;

      await verifyEnrollmentAccess({ userId, courseId });
      await deleteEnrollment({ userId, courseId });

      res.status(200).json({
        status: "success",
        message: "Enrollments deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EnrollmentController();
