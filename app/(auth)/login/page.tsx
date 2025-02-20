import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/auth/login-form'
import Image from 'next/image'

export default async function LoginPage() {
  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8" suppressHydrationWarning>
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
            alt="Aganitha Logo"
            width={150}
            height={60}
            className="h-12 w-auto"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}