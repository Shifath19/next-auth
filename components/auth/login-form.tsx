'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/toast-context'
import LoadingButton from '@/components/ui/loading-button'
import { Mail, Github } from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
  email: z.string().email('Invalid email format'),
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error: any) {
      showToast('Failed to sign in with Google', 'error')
    }
  }

  const handleGithubLogin = async () => {
    try {
      await signIn('github', { callbackUrl: '/dashboard' })
    } catch (error: any) {
      showToast('Failed to sign in with GitHub', 'error')
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to send OTP')
      
      showToast('OTP sent successfully!', 'success')
      window.location.href = '/verify?email=' + encodeURIComponent(values.email)
    } catch (error: any) {
      showToast(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800" suppressHydrationWarning>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-maincolor">Welcome Back</h2>
        <p className="mt-2 text-accentcolor">Sign in to your account</p>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Continue with Google</span>
        </button>

        {/* GitHub Sign In Button */}
        <button
          onClick={handleGithubLogin}
          className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <Github className="h-5 w-5" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Or continue with email
          </span>
        </div>
      </div>

      {/* OTP Email Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...form.register('email')}
              type="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-gray-900 focus:border-maincolor focus:ring-maincolor dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="w-full bg-maincolor hover:bg-opacity-90"
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </LoadingButton>
      </form>
    </div>
  )
}