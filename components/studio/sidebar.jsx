'use client'

import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { Type, Mail, Lock, MousePointerClick, Share2 } from 'lucide-react'

const icons = {
  header: Type,
  email: Mail,
  password: Lock,
  button: MousePointerClick,
  social: Share2,
}

function DraggableBlock({ type, label }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { type },
  })
  
  const Icon = icons[type] || Type

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'group flex items-center gap-3 p-3 mb-2 bg-white border border-zinc-200 rounded-lg cursor-grab hover:border-zinc-300 hover:shadow-sm transition-all active:cursor-grabbing',
        isDragging && 'opacity-50 ring-2 ring-zinc-900 border-transparent shadow-md'
      )}
    >
      <div className="h-8 w-8 rounded-md bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:bg-white group-hover:border-zinc-200 transition-colors">
         <Icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900" />
      </div>
      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">{label}</span>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-72 border-r border-zinc-200 bg-zinc-50/50 p-6 shrink-0 flex flex-col gap-8 overflow-y-auto backdrop-blur-xl">
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-1">
          Form Elements
        </h3>
        <DraggableBlock type="header" label="Header" />
        <DraggableBlock type="email" label="Email Field" />
        <DraggableBlock type="password" label="Password Field" />
      </div>
      
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-1">
          Actions
        </h3>
        <DraggableBlock type="button" label="Submit Button" />
        <DraggableBlock type="social" label="Social Login" />
      </div>
      
      <div className="mt-auto p-4 bg-blue-50 rounded-xl border border-blue-100">
         <p className="text-xs text-blue-600 leading-relaxed">
           <strong>Tip:</strong> Drag these blocks onto the canvas to build your auth flow.
         </p>
      </div>
    </div>
  )
}
