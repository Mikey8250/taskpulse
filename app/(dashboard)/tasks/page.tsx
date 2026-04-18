"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Task, FormData } from "@/types"
import Navbar from "@/components/Navbar"
import TaskColumn from "@/components/TaskColumn"
import TaskModal from "@/components/TaskModal"

const COLUMNS = [
  { key: "TODO", label: "To Do" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "DONE", label: "Done" },
]

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState("ALL")
  const [formData, setFormData] = useState<FormData>({
    title: "", description: "", status: "TODO", dueDate: ""
  })

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks")
      if (res.status === 401) { router.push("/login"); return }
      setTasks(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editTask ? `/api/tasks/${editTask.id}` : "/api/tasks"
    const method = editTask ? "PATCH" : "POST"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    if (res.ok) { await fetchTasks(); closeModal() }
  }

  const handleEdit = (task: Task) => {
    setEditTask(task)
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    await fetchTasks()
  }

  const closeModal = () => {
    setShowModal(false)
    setEditTask(null)
    setFormData({ title: "", description: "", status: "TODO", dueDate: "" })
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading tasks...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-6xl mx-auto">

        <Navbar title="My Tasks" subtitle={`${tasks.length} tasks total`} />

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {["ALL", "TODO", "IN_PROGRESS", "DONE"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {f === "ALL" ? "All" : f === "IN_PROGRESS" ? "In Progress" : f === "TODO" ? "To Do" : "Done"}
            </button>
          ))}
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          >
            + New Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map(col => (
            <TaskColumn
              key={col.key}
              title={col.label}
              tasks={tasks.filter(t => 
                (filter === "ALL" || filter === col.key) && t.status === col.key
              )}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <TaskModal
          editTask={editTask}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  )
}