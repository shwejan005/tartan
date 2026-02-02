'use client'

import { useState } from 'react'
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Canvas } from './canvas'
import { Sidebar } from './sidebar'
import { Properties } from './properties'

export function StudioEditor({ initialDesign, projectId }) {
  const [design, setDesign] = useState(initialDesign)
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [activeDragId, setActiveDragId] = useState(null)

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
        default:
            newBlock.label = 'New Block'
    }
    
    setDesign((prev) => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock],
    }))
  }

  return (
    <DndContext id="tartan-dnd" sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        <Sidebar onAddBlock={addBlock} />
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
      <DragOverlay>
          {activeDragId ? (
              <div className="px-4 py-2 bg-white border rounded shadow-lg">Dragging...</div>
           ) : null}
      </DragOverlay>
    </DndContext>
  )
}
