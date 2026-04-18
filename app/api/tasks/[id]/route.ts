import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import jwt from "jsonwebtoken"

function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return null
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded
  } catch {
    return null
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = getUserFromToken(req)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const task = await prisma.task.findFirst({
      where: { id, userId: user.userId }
    })

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })
    return NextResponse.json(task)

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = getUserFromToken(req)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { title, description, status, dueDate } = await req.json()

    const task = await prisma.task.findFirst({
      where: { id, userId: user.userId }
    })

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status, dueDate: dueDate ? new Date(dueDate) : null }
    })

    return NextResponse.json(updatedTask)

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = getUserFromToken(req)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const task = await prisma.task.findFirst({
      where: { id, userId: user.userId }
    })

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

    await prisma.task.delete({ where: { id } })

    return NextResponse.json({ message: "Task deleted successfully" })

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}