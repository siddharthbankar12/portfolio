const EmailService = require("../services/EmailService");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const result = await EmailService.sendContactEmail({ name, email, message });

  if (!result.success) {
    return res.status(result.error === "All fields are required" ? 400 : 500).json({
      error: result.error,
    });
  }

  res.status(200).json({ success: true, message: result.message });
};

module.exports = { sendEmail };