import { Task, FormData } from "@/types"

interface TaskModalProps {
  editTask: Task | null
  formData: FormData
  setFormData: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export default function TaskModal({ editTask, formData, setFormData, onSubmit, onClose }: TaskModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-xl">
              {editTask ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {editTask ? "Update task details" : "Add a new task to your board"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="e.g. Design landing page"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              placeholder="Add more details about this task..."
              rows={3}
            />
          </div>

          {/* Status + Due Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="TODO">📋 To Do</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="DONE">✅ Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl text-sm font-medium transition-colors border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {editTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}