import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="mx-auto max-w-7xl p-8" suppressHydrationWarning>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Welcome!</h2>
        <p className="mt-2 text-gray-600">
          You are logged in as {session.user?.email}
        </p>
      </div>
    </div>
  )
}