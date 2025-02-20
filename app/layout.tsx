'use client'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ui/toast-context'
import Navbar from '@/components/layout/navbar'
import './globals.css'

const fontSans = GeistSans
const fontMono = GeistMono

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <SessionProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

// 'use client'
// import AuthProvider from '@/components/providers/session-providers'
// import { GeistSans } from 'geist/font/sans'
// import { GeistMono } from 'geist/font/mono'
// import { SessionProvider } from 'next-auth/react'
// import { ToastProvider } from '@/components/ui/toast-context'
// import Navbar from '@/components/layout/navbar'
// import './globals.css'

// const fontSans = GeistSans
// const fontMono = GeistMono

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
//       <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
//         <SessionProvider>
//           <ToastProvider>
//             <Navbar />
//             <main className="min-h-[calc(100vh-64px)]">{children}</main>
//           </ToastProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }

