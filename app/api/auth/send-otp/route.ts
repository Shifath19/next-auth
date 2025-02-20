import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from '@/lib/prisma'
import { google } from "googleapis";

// Configure OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URL || "https://developers.google.com/oauthplayground"
);

// Set refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Debug logging
    console.log('Attempting to send OTP to:', email);
    console.log('Using SMTP_USER:', process.env.SMTP_USER);
    console.log('OAuth2 credentials:', {
      clientId: !!process.env.GOOGLE_CLIENT_ID,
      clientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: !!process.env.GMAIL_REFRESH_TOKEN
    });

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      // Get access token
      const accessToken = await oauth2Client.getAccessToken();
      console.log('Access token obtained:', !!accessToken.token);

      // Create SMTP transport with OAuth2
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.SMTP_USER || email,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken.token || undefined
        }
      });

      // Save OTP to database
      await prisma.oTP.create({
        data: {
          email,
          otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
          used: false,
        },
      });

      // Send email
      const mailOptions = {
        from: `"Aganitha Auth" <${process.env.SMTP_USER || email}>`,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p style="font-size: 16px; color: #666;">Here is your one-time password:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
              <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #999;">This code will expire in 10 minutes.</p>
            <p style="font-size: 14px; color: #999;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);

      return NextResponse.json({ success: true });
    } catch (emailError: any) {
      console.error('Email sending error:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command
      });
      throw emailError;
    }

  } catch (error: any) {
    console.error('OTP error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { error: 'Email authentication failed. Check OAuth credentials.' },
        { status: 401 }
      );
    }

    if (error.code === 'ESOCKET') {
      return NextResponse.json(
        { error: 'Network error. Check your connection.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send OTP', details: error.message },
      { status: 500 }
    );
  }
}