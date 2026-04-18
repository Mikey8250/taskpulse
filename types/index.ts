export interface Task {
  id: string
  title: string
  description?: string
  status: string
  dueDate?: string
  createdAt: string
}

export interface FormData {
  title: string
  description: string
  status: string
  dueDate: string
}