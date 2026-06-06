const nodemailer = require("nodemailer");
const { createEmailTemplate, createThankYouTemplate } = require("../templates/emailTemplate");

class EmailService {
  static createTransporter() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  static createMailOptions({ name, email, message }) {
    return {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO,
      subject: `📩 New Contact Form Submission from ${name}`,
      text: `
          Name: ${name}
          Email: ${email}
          Message:${message}
      `,
      html: createEmailTemplate({ name, email, message }),
    };
  }

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

    const transporter = this.createTransporter();
    const mailOptions = this.createMailOptions({ name, email, message });
    const thankYouOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your message, ${name}!`,
      html: createThankYouTemplate({ name }),
    };

    try {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(thankYouOptions);
      return { success: true, message: "Emails sent successfully" };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error: "Failed to send email" };
    }
  }
}

module.exports = EmailService;
