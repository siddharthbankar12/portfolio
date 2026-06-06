const createEmailTemplate = ({ name, email, message }) => `
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
`;

module.exports = { createEmailTemplate };