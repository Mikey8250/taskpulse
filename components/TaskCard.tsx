interface Task {
  id: string
  title: string
  description?: string
  status: string
  dueDate?: string
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <h3 className="text-white font-medium text-sm mb-1">{task.title}</h3>
      
      {task.description && (
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{task.description}</p>
      )}
      
      {task.dueDate && (
        <p className="text-gray-500 text-xs mb-3">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}