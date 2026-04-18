import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-3">
          Task<span className="text-blue-500">Pulse</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your tasks. Stay productive.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl w-full">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-white font-semibold mb-1">Track Tasks</h3>
          <p className="text-gray-400 text-sm">Create and manage tasks with ease</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-white font-semibold mb-1">Kanban Board</h3>
          <p className="text-gray-400 text-sm">Visualize progress across columns</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-white font-semibold mb-1">Secure Auth</h3>
          <p className="text-gray-400 text-sm">JWT based secure authentication</p>
        </div>
      </div>

    </div>
  )
}