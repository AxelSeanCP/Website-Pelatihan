const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/CertificateController");

router.post("/", CertificateController.create);
router.get("/:certificateId/verify", CertificateController.getOne);

module.exports = router;
