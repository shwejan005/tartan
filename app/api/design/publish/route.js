import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request) {
  try {
    const { projectId, config } = await request.json()

    if (!projectId || !config) {
      return NextResponse.json(
        { error: 'Missing projectId or config' },
        { status: 400 }
      )
    }

    // Update the design with published config
    // We update both config (current state) and publishedConfig
    // In a real app, you might want separate endpoints for save vs publish
    const design = await prisma.design.update({
      where: {
        projectId: projectId,
      },
      data: {
        config: config,
        publishedConfig: config,
        isPublished: true,
      },
    })

    return NextResponse.json({ success: true, design })
  } catch (error) {
    console.error('Failed to publish design:', error)
    return NextResponse.json(
      { error: 'Failed to publish design' },
      { status: 500 }
    )
  }
}
