'use client'

import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { Type, MousePointerClick, Square, LayoutTemplate, Image, FormInput } from 'lucide-react'

const icons = {
  text: Type,
  input: FormInput,
  button: MousePointerClick,
  image: Image,
  box: Square,
}

function AssetBlock({ type, label, onClick }) {
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
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center gap-2 p-3 bg-transparent hover:bg-zinc-100 rounded-md cursor-pointer transition-all active:cursor-grabbing',
        isDragging && 'opacity-50'
      )}
    >
      <div className="h-10 w-10 text-zinc-600 group-hover:text-black flex items-center justify-center bg-white border border-zinc-200 shadow-sm rounded-lg group-hover:scale-105 transition-all">
         <Icon strokeWidth={1.5} className="w-5 h-5" />
      </div>
      <span className="text-[10px] uppercase font-semibold text-zinc-400 group-hover:text-zinc-600 transition-colors tracking-wide text-center">{label}</span>
    </div>
  )
}

export function Sidebar({ onAddBlock }) {
  return (
    <div className="w-64 border-r border-zinc-200 bg-zinc-50/30 flex flex-col backdrop-blur-xl">
      <div className="h-12 border-b border-zinc-200 flex items-center px-4">
         <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Assets</span>
      </div>

      <div className="p-4 overflow-y-auto flex-1 space-y-8">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">
            Build
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <AssetBlock type="text" label="Text" onClick={() => onAddBlock('text')} />
            <AssetBlock type="input" label="Input" onClick={() => onAddBlock('input')} />
            <AssetBlock type="button" label="Button" onClick={() => onAddBlock('button')} />
            <AssetBlock type="box" label="Box" onClick={() => onAddBlock('box')} />
          </div>
        </div>
        
        <div>
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">
            Media
          </h3>
           <div className="grid grid-cols-2 gap-2">
            {/* Social is a specific preset we might keep for convenience, or make generic */}
            <AssetBlock type="social" label="Social" onClick={() => onAddBlock('social')} />
          </div>
        </div>
      </div>
    </div>
  )
}
