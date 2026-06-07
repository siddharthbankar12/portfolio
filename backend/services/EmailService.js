const { Resend } = require("resend");
const {
  createEmailTemplate,
  createThankYouTemplate,
} = require("../templates/emailTemplate");

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  static validateContactForm({ name, email, message }) {
    if (!name || !email || !message) {
      return { valid: false, error: "All fields are required" };
    }
    return { valid: true };
  }

  static async sendContactEmail({ name, email, message }) {
    const validation = this.validateContactForm({ name, email, message });
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Email to you
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.EMAIL_TO,
        subject: `📩 New Contact Form Submission from ${name}`,
        html: createEmailTemplate({ name, email, message }),
      });

      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: email,
        subject: `Thank you for your message, ${name}!`,
        html: createThankYouTemplate({ name }),
      });

      return { success: true, message: "Emails sent successfully" };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error: error.message || "Failed to send email" };
    }
  }
}

module.exports = EmailService;