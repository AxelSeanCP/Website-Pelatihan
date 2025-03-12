const db = require("../models");
const { Op } = require("sequelize");
const { nanoid } = require("nanoid");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../exceptions");

const verifyEnrollment = async ({ userId, courseId }) => {
  const enrollment = await db.Enrollment.findOne({
    where: {
      [Op.and]: [{ userId }, { courseId }],
    },
  });

  if (enrollment) {
    throw new BadRequestError("User already enrolled");
  }
};

const createEnrollment = async ({ id: userId, courseId }) => {
  await verifyEnrollment({ userId, courseId });

  const id = `enrollment-${nanoid(16)}`;

  const { id: enrollmentId } = await db.Enrollment.create({
    id,
    userId,
    courseId,
  });

  return enrollmentId;
};

const getEnrollments = async (userId) => {
  const enrollments = await db.Enrollment.findAll({
    where: {
      userId,
    },
  });

  if (enrollments.length === 0) {
    throw new NotFoundError("No enrollments found");
  }

  return { enrollments };
};

const deleteEnrollment = async ({ userId, courseId }) => {
  await db.Enrollment.destroy({
    where: {
      userId,
      courseId,
    },
  });
};

const verifyEnrollmentAccess = async ({ userId, courseId }) => {
  const enrollment = await db.Enrollment.findOne({
    where: {
      userId,
      courseId,
    },
  });

  if (!enrollment) {
    throw new ForbiddenError("You don't have access to this resource");
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
  verifyEnrollmentAccess,
};
