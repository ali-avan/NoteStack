'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/schemas/loginSchema'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert('Error occurred during login')
    } else {
      router.push('/auth/dashboard')
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/photos/bg.jpg')` }}
    >
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm -mt-3">{errors.password.message}</p>}

          <div className="flex justify-end">
           <a href="/auth/forgotpassword" className="text-blue-300 hover:underline text-sm">
            Forgot password?
           </a>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-300 mt-6">
            Don&apos;t have an account?{' '}
            <a href="/auth/register" className="text-blue-400 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
