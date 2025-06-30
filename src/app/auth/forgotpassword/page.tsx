'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

// ✅ Zod schema for email validation
const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = async ({ email }: ForgotPasswordFormData) => {
    setErrorMessage('')
    setSuccessMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3001/auth/update-password', // ✅ Update with your deployed route
    })

    if (error) {
      setErrorMessage('Failed to send reset link. Try again.')
    } else {
      setSuccessMessage('Reset link sent! Check your email.')
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/photos/bg.jpg')` }}
    >
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>}

          {errorMessage && <p className="text-red-500 text-sm -mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm -mt-2">{successMessage}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            Send Reset Link
          </button>

          <p className="text-center text-gray-300 mt-6">
            Remembered your password?{' '}
            <a href="/auth/login" className="text-blue-400 hover:underline">
              Go back to login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
