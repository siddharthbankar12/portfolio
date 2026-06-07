const nodemailer = require("nodemailer");
const {
  createEmailTemplate,
  createThankYouTemplate,
} = require("../templates/emailTemplate");

class EmailService {
  static transporter = null;

  static async getTransporter() {
    if (!this.transporter) {
      const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

      if (!EMAIL_USER) throw new Error("EMAIL_USER not configured");
      if (!EMAIL_PASS) throw new Error("EMAIL_PASS not configured");

      this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        family: 4,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      try {
        await this.transporter.verify();
        console.log("SMTP transporter verified successfully");
      } catch (error) {
        this.transporter = null; 
        console.error("SMTP verification failed:", error);
        throw new Error(
          `Email service not configured properly: ${error.message}`,
        );
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

    try {
      const transporter = await this.getTransporter();
      const mailOptions = this.createMailOptions({ name, email, message });
      const thankYouOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for your message, ${name}!`,
        html: createThankYouTemplate({ name }),
      };

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
