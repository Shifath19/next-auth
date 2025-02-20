import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    // Find the OTP record
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        otp,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    })

    // Create or update user
    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    })

    return NextResponse.json({ 
      success: true,
      user: { email: user.email }
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}