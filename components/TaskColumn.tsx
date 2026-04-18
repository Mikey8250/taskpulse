import TaskCard from "./TaskCard"

interface Task {
  id: string
  title: string
  description?: string
  status: string
  dueDate?: string
  createdAt: string
}

interface TaskColumnProps {
  title: string
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskColumn({ title, tasks, onEdit, onDelete }: TaskColumnProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">{title}</h2>
        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-600 text-sm">
            No tasks here
          </div>
        )}
      </div>
    </div>
  )
}