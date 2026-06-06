const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/EmailController");

router.post("/contact", sendEmail);

module.exports = router;