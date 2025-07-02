'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "@/component/LogoutButton"
import { Home, UploadCloud, FileText } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navLinks = [
    { name: "Dashboard", href: "/auth/dashboard", icon: <Home size={18} /> },
    { name: "Upload", href: "/auth/dashboard/upload", icon: <UploadCloud size={18} /> },
    { name: "My Content", href: "/auth/dashboard/my-content", icon: <FileText size={18} /> },
  ]

  return (
    <div className="min-h-screen flex bg-gray-800 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-900 fixed top-0 left-0 flex flex-col justify-between py-6 px-4 border-r border-gray-700 shadow-md">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-300 px-2 mb-4">NoteStack</h2>

          {navLinks.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition font-medium ${
                pathname === href
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {icon}
              {name}
            </Link>
            
          ))}
        </div>

        <div className=" flex justify-center">
          <LogoutButton />
        </div>

        
      </aside>

      {/* Main content */}
      <main
        className="ml-64 flex-1 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen overflow-y-auto"
        style={{ backgroundImage: `url('/photos/bg.jpg')` }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
