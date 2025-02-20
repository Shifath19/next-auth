import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { User, Mail, Calendar, Clock, Building, Activity } from 'lucide-react'

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  })

  return (
    <div className="mx-auto max-w-7xl p-8" suppressHydrationWarning>
      <div className="mb-8 flex items-center space-x-4">
        <div className="rounded-full bg-maincolor p-3 shadow-lg">
          <User className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-maincolor">My Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Information Card */}
        <div className="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-maincolor/10 p-2">
                <Mail className="h-5 w-5 text-maincolor" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-maincolor/10 p-2">
                <Calendar className="h-5 w-5 text-maincolor" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Created
                </p>
                <p className="text-gray-900 dark:text-white">
                  {user?.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Company Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-maincolor/10 p-2">
                <Building className="h-5 w-5 text-maincolor" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organization
                </p>
                <p className="text-gray-900 dark:text-white">Aganitha</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-maincolor/10 p-2">
                <Clock className="h-5 w-5 text-maincolor" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Login
                </p>
                <p className="text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-950">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Logged in successfully
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                Success
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-950">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email verified
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(Date.now() - 3600000).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}