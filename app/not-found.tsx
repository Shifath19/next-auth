import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}