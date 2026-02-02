import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { AuthRenderer } from '@/components/runtime/auth-renderer'

export default async function AuthPage({ params }) {
  const { projectId } = await params
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { design: true },
  })

  if (!project) {
    notFound()
  }

  const design = project.design?.config || {
    blocks: [],
    theme: {
      primaryColor: '#000000',
      borderRadius: '0.5rem',
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
       <AuthRenderer design={design} projectId={projectId} />
    </div>
  )
}
