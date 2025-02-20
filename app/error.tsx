'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 text-center" suppressHydrationWarning>
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p className="mt-4 text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-8 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}