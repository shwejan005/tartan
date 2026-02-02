'use client'

import { useState } from 'react'
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
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

    if (over && over.id === 'canvas') {
      const type = active.data.current?.type
      if (type) {
        addBlock(type)
      }
    }
    setActiveDragId(null)
  }

  const addBlock = (type) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      label: type === 'email' ? 'Email Address' : type === 'password' ? 'Password' : 'Sign In',
      placeholder: type === 'email' ? 'user@example.com' : '••••••••',
    }
    
    setDesign((prev) => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock],
    }))
  }

  return (
    <DndContext id="tartan-dnd" sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        <Sidebar />
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
