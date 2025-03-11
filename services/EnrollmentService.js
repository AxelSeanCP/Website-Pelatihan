const db = require("../models");
const { Op } = require("sequelize");
const { nanoid } = require("nanoid");
const { BadRequestError, NotFoundError } = require("../exceptions");
const { mapEnrollmentsToModel } = require("../utils/mapTableToModel");

const verifyEnrollment = async ({ userId, courseId }) => {
  const enrollment = await db.Enrollment.findOne({
    where: {
      [Op.and]: [{ user_id: userId }, { course_id: courseId }],
    },
  });

  if (enrollment) {
    throw new BadRequestError("User already enrolled");
  }
};

const createEnrollment = async ({ id: userId, courseId }) => {
  await verifyEnrollment({ userId, courseId });

  const id = `enrollment-${nanoid(16)}`;

  await db.Enrollment.create({ id, userId, courseId });
};

const getEnrollments = async (userId) => {
  //buat userId optional
  const enrollments = await db.Enrollment.findAll({
    where: {
      userId,
    },
  });

  if (enrollments.length === 0) {
    throw new NotFoundError("No enrollments found");
  }

  return { enrollments: enrollments.map(mapEnrollmentsToModel) };
};

module.exports = { createEnrollment, getEnrollments };
