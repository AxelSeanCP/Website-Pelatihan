const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/AuthenticationController");

router.post("/", AuthenticationController.postAuthentication);
router.put("/", AuthenticationController.putAuthentication);
router.delete("/", AuthenticationController.deleteAuthentication);

module.exports = router;
