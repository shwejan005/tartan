'use client'

import { useState } from 'react'
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, pointerWithin } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Canvas } from './canvas'
import { Sidebar } from './sidebar'
import { Properties } from './properties'

export function StudioEditor({ initialDesign, projectId, projectName }) {
  const [design, setDesign] = useState(initialDesign)
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [activeDragId, setActiveDragId] = useState(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      const res = await fetch('/api/design/publish', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, config: design }),
      })
      
      if (!res.ok) throw new Error('Failed to publish')
      
      const { design: updatedDesign } = await res.json()
      // Show simple alert for now, or use a toast library if available (none seen in dependencies list, assuming basic)
      // Actually, better to copy Link to clipboard
      const publicUrl = `${window.location.origin}/p/${projectId}`
      window.prompt("Published successfully! Share this URL:", publicUrl)

    } catch (error) {
      console.error(error)
      alert("Failed to publish. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) {
      setActiveDragId(null)
      return
    }

    // Handling reordering of existing blocks
    const activeBlockId = active.id
    const overBlockId = over.id
    
    // If both IDs exist in our blocks, it's a reorder
    const isReordering = design.blocks?.some(b => b.id === activeBlockId)

    if (isReordering) {
        if (activeBlockId !== overBlockId) {
            setDesign((prev) => {
                const oldIndex = prev.blocks.findIndex((b) => b.id === activeBlockId)
                const newIndex = prev.blocks.findIndex((b) => b.id === overBlockId)
                
                return {
                    ...prev,
                    blocks: arrayMove(prev.blocks, oldIndex, newIndex)
                }
            })
        }
    } else if (over.id === 'canvas' || over.data?.current?.sortable) {
       // Handling adding new blocks from sidebar
       const type = active.data.current?.type
       if (type) {
         addBlock(type)
       }
    }

    setActiveDragId(null)
  }

  const addBlock = (type) => {
    let newBlock = {
      id: crypto.randomUUID(),
      type,
    }

    switch (type) {
        case 'text':
            newBlock.content = 'Double click to edit text'
            newBlock.style = { fontSize: '16px', fontWeight: '400' }
            break
        case 'input':
            newBlock.label = 'Label'
            newBlock.placeholder = 'Placeholder...'
            newBlock.inputType = 'text' // text, email, password
            break
        case 'button':
            newBlock.label = 'Button'
            newBlock.variant = 'primary'
            break
        case 'box':
            newBlock.style = { height: '100px', backgroundColor: '#f4f4f5' }
            break
        case 'social':
            newBlock.label = 'Continue with Google'
            break
        case 'image':
            newBlock.src = ''
            newBlock.alt = 'Image'
            newBlock.style = { width: '100%', height: 'auto' }
            break
        default:
            newBlock.label = 'New Block'
    }
    
    setDesign((prev) => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock],
    }))
  }

  const handleApplyTemplate = (templateDesign) => {
    // Generate new IDs to avoid conflicts if template is applied multiple times
    const newBlocks = templateDesign.blocks.map(b => ({ ...b, id: crypto.randomUUID() }))
    setDesign({
        ...templateDesign,
        blocks: newBlocks
    })
    setSelectedBlockId(null)
  }

  return (
    <DndContext 
        id="tartan-dnd" 
        sensors={sensors} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin} // Better for small drop targets or layered elements
    >
      <div className="flex flex-col h-full w-full">
        <header className="h-14 border-b bg-white flex items-center px-4 justify-between shrink-0 z-10 relative">
            <div className="font-semibold">{projectName} <span className="text-slate-400 font-normal">/ Login Flow</span></div>
            <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-black text-white px-4 py-2 text-sm rounded-md disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
                {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
        </header>
      <div className="flex h-full overflow-hidden">
        <Sidebar onAddBlock={addBlock} onApplyTemplate={handleApplyTemplate} />
        <Canvas 
          blocks={design.blocks || []} 
          theme={design.theme} 
          onSelect={setSelectedBlockId} 
          selectedId={selectedBlockId} 
        />
        <Properties 
             selectedId={selectedBlockId} 
             blocks={design.blocks || []}
             theme={design.theme}
             onUpdate={(blocks) => setDesign(prev => ({ ...prev, blocks }))}
             onUpdateTheme={(theme) => setDesign(prev => ({ ...prev, theme }))}
        />
      </div>
      </div>
      <DragOverlay>
          {activeDragId ? (
              <div className="px-4 py-2 bg-white border rounded shadow-lg">Dragging...</div>
           ) : null}
      </DragOverlay>
    </DndContext>
  )
}
