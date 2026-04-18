import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db"
import Link from "next/link"

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) redirect("/login")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    return user
  } catch {
    redirect("/login")
  }
}

async function getTaskStats(userId: string) {
  const tasks = await prisma.task.findMany({
    where: { userId }
  })

  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "TODO").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    done: tasks.filter(t => t.status === "DONE").length,
  }
}

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) redirect("/login")

  const stats = await getTaskStats(user.id)

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hey, {user.name} 👋
            </h1>
            <p className="text-gray-400 mt-1">Here's your task overview</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/tasks"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View Tasks
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">To Do</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{stats.todo}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{stats.inProgress}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Done</p>
            <p className="text-3xl font-bold text-green-400 mt-1">{stats.done}</p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-2">Quick Actions</h2>
          <p className="text-gray-400 text-sm mb-4">Manage your tasks efficiently</p>
          <Link
            href="/tasks"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            + Create New Task
          </Link>
        </div>

      </div>
    </div>
  )
}