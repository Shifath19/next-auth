import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 text-center" suppressHydrationWarning>
      <h1 className="text-7xl font-bold text-accentcolor">Welcome to Aganitha Auth</h1>
      <p className="mt-4 max-w-md text-lg text-gray-800 dark:text-gray-300">
        A secure authentication system for Aganitha employees. Login with your
        @aganitha.ai email address.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-md bg-secondcolor px-6 py-3 text-white hover:bg-opacity-90 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}