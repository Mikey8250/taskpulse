"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface NavbarProps {
  title?: string
  subtitle?: string
}

export default function Navbar({ title, subtitle }: NavbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/tasks"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Tasks
        </Link>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}