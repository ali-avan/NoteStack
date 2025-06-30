'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormData } from "@/schemas/registerSchema"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password } = data

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3001/auth/notes',
      },
    })

    if (error) {
      console.error("Supabase error:", error)
    } else {
      alert("Registration successful. Please check your email.")
      router.push('/auth/login')
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/photos/bg.jpg')` }}>
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm -mt-3">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm -mt-3">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?{' '}
            <a href="/auth/login" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
