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

  let initialDesign = project.design?.config || {
    blocks: [],
    theme: {
      primaryColor: '#000000',
      borderRadius: '0.5rem',
    }
  }

  // Temporary Migration for Dev: Fix legacy block types
  if (initialDesign.blocks) {
    initialDesign.blocks = initialDesign.blocks.map(block => {
        if (block.type === 'header') {
            return { 
                ...block, 
                type: 'text', 
                style: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' } 
            }
        }
        if (block.type === 'email') {
            return { ...block, type: 'input', inputType: 'email', label: block.label || 'Email' }
        }
        if (block.type === 'password') {
             return { ...block, type: 'input', inputType: 'password', label: block.label || 'Password' }
        }
        return block
    })
  }

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col">
       <StudioEditor initialDesign={initialDesign} projectId={projectId} projectName={project.name} />

    </div>
  )
}
