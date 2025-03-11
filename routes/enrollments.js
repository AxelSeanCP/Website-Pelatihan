const express = require("express");
const router = express.Router();
const EnrollmentController = require("../controllers/EnrollmentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, EnrollmentController.get);
router.post("/", authMiddleware, EnrollmentController.create);

module.exports = router;
