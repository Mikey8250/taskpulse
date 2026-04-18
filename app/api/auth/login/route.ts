import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    // Set token in httpOnly cookie
    const response = NextResponse.json(
      { message: "Login successful", user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response

  } catch (error) {
    console.error("REGISTER ERROR:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}