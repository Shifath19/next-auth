'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Home, User, LogOut, Menu, X } from 'lucide-react'
import Image from 'next/image'
import ThemeSwitcher from '@/components/ui/theme-switcher'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Logo on the left */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
                  alt="Aganitha Logo"
                  width={120}
                  height={0}
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Navigation items and theme switcher on the right */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {session && (
                <>
                  <Link
                    href="/"
                    className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
                      pathname === '/'
                        ? 'bg-maincolor text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
                      pathname === '/profile'
                        ? 'bg-maincolor text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && session && (
          <div className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Home
              </Link>
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h3 className="text-lg font-medium">Confirm Logout</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Are you sure you want to logout?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}