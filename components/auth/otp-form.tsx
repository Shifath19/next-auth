'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast-context'
import LoadingButton from '@/components/ui/loading-button'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export default function OTPForm({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: values.otp }),
      })

      if (!response.ok) throw new Error('Invalid OTP')
      
      const data = await response.json()
      
      // Sign in after OTP verification
      const result = await signIn('credentials', {
        email,
        redirect: false,
      })

      if (result?.error) {
        throw new Error('Failed to sign in')
      }

      window.location.href = '/dashboard'
    } catch (error: any) {
      showToast(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Enter OTP</h2>
        <p className="mt-2 text-gray-600">Check your email for the OTP</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <input
          {...form.register('otp')}
          type="text"
          maxLength={6}
          className="block w-full rounded-md border px-3 py-2"
          placeholder="Enter 6-digit OTP"
        />
        {form.formState.errors.otp && (
          <p className="text-sm text-red-600">{form.formState.errors.otp.message}</p>
        )}

        <LoadingButton isLoading={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </LoadingButton>
      </form>
    </div>
  )
}