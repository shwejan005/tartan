'use client'

import { useDraggable } from '@dnd-kit/core'
import { useState } from 'react'
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

import { TEMPLATES } from '@/components/studio/templates'

export function Sidebar({ onAddBlock, onApplyTemplate }) {
  const [activeTab, setActiveTab] = useState('elements')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(TEMPLATES.map(t => t.category))]
  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory)

  return (
    <div className="w-64 border-r border-zinc-200 bg-white flex flex-col h-full shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10">
      <div className="flex p-2 gap-1 border-b border-zinc-100">
         <button 
            onClick={() => setActiveTab('elements')}
            className={cn(
                "flex-1 py-2 text-xs font-semibold rounded-md transition-all",
                activeTab === 'elements' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
            )}
         >
            Elements
         </button>
         <button 
            onClick={() => setActiveTab('templates')}
            className={cn(
                "flex-1 py-2 text-xs font-semibold rounded-md transition-all",
                activeTab === 'templates' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
            )}
         >
            Templates
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'elements' ? (
             <div className="space-y-8">
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
                    <AssetBlock type="image" label="Image" onClick={() => onAddBlock('image')} />
                    <AssetBlock type="social" label="Social" onClick={() => onAddBlock('social')} />
                </div>
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                 <div className="flex flex-wrap gap-1 pb-2 border-b border-zinc-50">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-2 py-1 text-[10px] rounded-full border transition-all",
                                selectedCategory === cat 
                                    ? "bg-zinc-900 text-white border-zinc-900" 
                                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                 </div>

                 <div className="space-y-3">
                    {filteredTemplates.map(template => (
                        <button
                        key={template.id}
                        onClick={() => {
                            if (confirm('This will replace your current design. Continue?')) {
                                onApplyTemplate(template.design)
                            }
                        }}
                        className="w-full text-left p-3 rounded-lg border border-zinc-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                        >
                            <div className="h-20 bg-zinc-100 rounded-md mb-2 overflow-hidden relative border border-zinc-100 flex items-center justify-center">
                                {/* Simple preview visualization */}
                                <div className="scale-[0.25] p-4 bg-white shadow-sm ring-1 ring-black/5" 
                                     style={{ 
                                         borderRadius: template.design.theme.borderRadius,
                                         width: '200px',
                                         height: '150px' 
                                     }}>
                                     <div className="space-y-2">
                                         {template.design.blocks.slice(0, 3).map((b, i) => (
                                             <div key={i} className="h-2 bg-zinc-100 rounded w-full" />
                                         ))}
                                     </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-zinc-700 group-hover:text-blue-700 block">{template.name}</span>
                                <span className="text-[9px] text-zinc-400 uppercase">{template.category}</span>
                            </div>
                        </button>
                    ))}
                 </div>
            </div>
        )}
      </div>
    </div>
  )
}
