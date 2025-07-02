'use client'

import DashboardLayout from "@/component/DashboardLayout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-center text-white">
          <h1 className="text-2xl font-bold mb-4 text-blue-200">Welcome to NoteStack</h1>
          <p className="text-lg mb-6 text-gray-300">
            Manage and organize your uploaded files
          </p>

          <a
            href="/auth/dashboard/my-content"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded block transition duration-200"
          >
            Go to Your Notes
          </a>
        </div>
      </div>
    </DashboardLayout>
  )
}
