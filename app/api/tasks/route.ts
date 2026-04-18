import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import jwt from "jsonwebtoken"

// Helper function to get user from token
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

// GET all tasks
export async function GET(req: NextRequest) {
  try {
    const user = getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(tasks)

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

// CREATE task
export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, status, dueDate } = await req.json()

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: user.userId
      }
    })

    return NextResponse.json(task, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}