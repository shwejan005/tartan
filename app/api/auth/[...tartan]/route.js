import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { hashPassword, verifyPassword, setSession, clearSession, getSession } from '@/lib/auth'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})

export async function POST(request, { params }) {
  const { tartan } = await params
  const action = tartan[0]

  try {
    if (action === 'signup') {
      const body = await request.json()
      const { email, password, name } = SignupSchema.parse(body)

      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      const hashedPassword = await hashPassword(password)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || email.split('@')[0],
        },
      })

      // Create a default project for the user
      await prisma.project.create({
        data: {
          name: 'My First Project',
          userId: user.id,
          design: {
            create: {
              config: {},
            },
          },
        },
      })

      await setSession({ id: user.id, email: user.email, name: user.name })
      return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } })
    }

    if (action === 'login') {
      const body = await request.json()
      const { email, password } = LoginSchema.parse(body)

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user || !user.password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const isValid = await verifyPassword(password, user.password)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      await setSession({ id: user.id, email: user.email, name: user.name })
      return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } })
    }

    if (action === 'logout') {
      await clearSession()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Auth error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  const { tartan } = await params
  const action = tartan[0]

  if (action === 'me') {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ user: null })
    }
    return NextResponse.json({ user: session })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
