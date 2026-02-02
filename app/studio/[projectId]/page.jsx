import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { StudioEditor } from '@/components/studio/editor'

export default async function StudioPage({ params }) {
  const { projectId } = await params
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { design: true },
  })

  if (!project) {
    notFound()
  }

  const initialDesign = project.design?.config || {
    blocks: [],
    theme: {
      primaryColor: '#000000',
      borderRadius: '0.5rem',
    }
  }

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col">
       <header className="h-14 border-b bg-white flex items-center px-4 justify-between">
          <div className="font-semibold">{project.name} <span className="text-slate-400 font-normal">/ Login Flow</span></div>
          <button className="bg-black text-white px-4 py-2 text-sm rounded-md">Publish</button>
       </header>
       <div className="flex-1 overflow-hidden">
          <StudioEditor initialDesign={initialDesign} projectId={projectId} />
       </div>
    </div>
  )
}
