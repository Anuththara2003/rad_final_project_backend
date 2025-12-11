import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  email: string;
  subject: string;
  message: string;     // සාමාන්‍ය පණිවිඩය
  url?: string;        // Button එකට දාන්න ඕන Link එක (Optional)
}

const sendEmail = async (options: EmailOptions) => {
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // --- HTML Email Template ---
  // මේකෙන් තමයි Email එක ලස්සනට පෙන්නන්නේ
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
            <h1 style="color: #ff4d4d; margin: 0;">Giftify 🎁</h1>
            <p style="color: #888; margin-top: 5px;">Find the perfect gift.</p>
        </div>

        <div style="padding: 20px 0; text-align: center;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.5;">
                Hello, <br/>
                We received a request to reset your password for your Giftify account.
                Click the button below to reset it.
            </p>

            <!-- CLICKABLE BUTTON -->
            <div style="margin: 30px 0;">
                <a href="${options.url}" style="background-color: #ff4d4d; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(255, 77, 77, 0.3);">
                    Reset Password
                </a>
            </div>

            <p style="color: #999; font-size: 14px;">
                Or copy and paste this link into your browser: <br/>
                <a href="${options.url}" style="color: #ff4d4d;">${options.url}</a>
            </p>

            <p style="color: #999; font-size: 13px; margin-top: 20px;">
                This link will expire in 10 minutes.<br/>
                If you didn't request this, please ignore this email.
            </p>
        </div>

        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #aaa; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Giftify. All rights reserved.
        </div>
    </div>
  `;

  const mailOptions = {
    from: '"Giftify Support" <no-reply@giftify.com>',
    to: options.email,
    subject: options.subject,
    text: options.message, // HTML වැඩ නැති පරණ phones වලට මේක පෙන්නනවා
    html: htmlTemplate,    // HTML වැඩ කරන අයට මේ ලස්සන එක පෙන්නනවා
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email successfully sent to Mailtrap!`);
  } catch (error: any) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
};

export default sendEmail;