import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Your Login OTP',
    html: `
      <div style="padding: 20px; background: #f9f9f9;">
        <h2>Your Login OTP</h2>
        <p>Use the following OTP to login:</p>
        <h1 style="color: #333; font-size: 24px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}