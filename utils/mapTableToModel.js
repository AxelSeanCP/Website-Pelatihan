const mapEnrollmentsToModel = ({ id, user_id, course_id }) => ({
  id,
  userId: user_id,
  courseId: course_id,
});

module.exports = { mapEnrollmentsToModel };
