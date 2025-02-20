import { redirect } from 'next/navigation'
import OTPForm from '@/components/auth/otp-form'

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  if (!searchParams.email) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8" suppressHydrationWarning>
      <OTPForm email={searchParams.email} />
    </div>
  )
}