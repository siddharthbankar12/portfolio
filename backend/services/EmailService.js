const nodemailer = require("nodemailer");
const { createEmailTemplate, createThankYouTemplate } = require("../templates/emailTemplate");

class EmailService {
  static transporter = null;

  static async getTransporter() {
    if (!this.transporter) {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;

      if (!emailUser || !emailPass) {
        throw new Error("EMAIL_USER and EMAIL_PASS environment variables are required");
      }

      const emailTo = process.env.EMAIL_TO;
      if (!emailTo) {
        throw new Error("EMAIL_TO environment variable is required");
      }

      this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        timeout: 30000,
      });

      try {
        await this.transporter.verify();
        console.log("SMTP transporter verified successfully");
      } catch (error) {
        console.error("SMTP transporter verification failed:", error.message);
        throw new Error(`Email service not configured properly: ${error.message}`);
      }
    }
    return this.transporter;
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

    const transporter = await this.getTransporter();
    const mailOptions = this.createMailOptions({ name, email, message });
    const thankYouOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your message, ${name}!`,
      html: createThankYouTemplate({ name }),
    };

    try {
      const info1 = await transporter.sendMail(mailOptions);
      const info2 = await transporter.sendMail(thankYouOptions);
      console.log("Emails sent:", info1.messageId, info2.messageId);
      return { success: true, message: "Emails sent successfully" };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error: error.message || "Failed to send email" };
    }
  }
}

module.exports = EmailService;
