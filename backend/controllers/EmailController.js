const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_TO || "siddharthbankar1204@gmail.com",
    subject: `📩 New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
  `,
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f9; padding: 30px;">
      <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">
            You have received a new message through your portfolio website.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; width: 120px;">
                Name
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                ${name}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                Email
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
                  ${email}
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; font-weight: bold; vertical-align: top;">
                Message
              </td>
              <td style="padding: 12px; background: #f9fafb; border-radius: 6px;">
                ${message.replace(/\n/g, "<br>")}
              </td>
            </tr>
          </table>

          <div style="margin-top: 30px; text-align: center;">
            <a 
              href="mailto:${email}"
              style="
                display: inline-block;
                padding: 12px 24px;
                background: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              "
            >
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 15px; text-align: center; color: #6b7280; font-size: 13px;">
          This email was automatically generated from your portfolio contact form.
          <br />
          © ${new Date().getFullYear()} Siddharth Bankar Portfolio
        </div>
      </div>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendEmail };
