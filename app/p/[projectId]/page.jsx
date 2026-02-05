import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { Renderer } from '@/components/renderer'

export default async function PublicPage({ params }) {
  const { projectId } = await params
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { design: true },
  })

  // If project doesn't exist, or has no design, or isn't published
  if (!project || !project.design || !project.design.isPublished) {
    notFound()
  }

  const publishedDesign = project.design.publishedConfig || project.design.config

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4">
       <Renderer design={publishedDesign} />
       
       <div className="fixed bottom-4 right-4 text-xs text-zinc-400 font-medium bg-white/50 backdrop-blur px-2 py-1 rounded-md border border-zinc-100">
          Powered by <span className="text-zinc-900">Tartan</span>
       </div>
    </div>
  )
}
