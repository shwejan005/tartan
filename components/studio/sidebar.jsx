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

export function Sidebar({ onAddBlock, onApplyTemplate }) {
  const [activeTab, setActiveTab] = useState('elements')

  const templates = [
    {
      id: 'simple-login',
      name: 'Simple Login',
      design: {
        blocks: [
          { id: '1', type: 'text', content: 'Welcome Back', style: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' } },
          { id: '2', type: 'text', content: 'Please sign in to continue', style: { fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '24px' } },
          { id: '3', type: 'input', inputType: 'email', label: 'Email Address', placeholder: 'you@example.com' },
          { id: '4', type: 'input', inputType: 'password', label: 'Password', placeholder: '••••••••' },
          { id: '5', type: 'button', label: 'Sign In', variant: 'primary' },
          { id: '6', type: 'social', label: 'Or continue with' }
        ],
        theme: {
          primaryColor: '#000000',
          borderRadius: '0.5rem',
          layout: 'centered',
          font: 'sans'
        }
      }
    },
    {
       id: 'split-screen',
       name: 'Split Screen',
       design: {
           blocks: [
             { id: '1', type: 'text', content: 'Create Account', style: { fontSize: '28px', fontWeight: '800', marginBottom: '8px' } },
             { id: '2', type: 'input', inputType: 'text', label: 'Full Name', placeholder: 'John Doe' },
             { id: '3', type: 'input', inputType: 'email', label: 'Email', placeholder: 'john@example.com' },
             { id: '4', type: 'input', inputType: 'password', label: 'Password', placeholder: 'Create a password' },
             { id: '5', type: 'button', label: 'Create Account', variant: 'primary' },
           ],
           theme: {
             primaryColor: '#2563EB',
             borderRadius: '0.25rem',
             layout: 'split',
             font: 'sans'
           }
       }
    },
    {
       id: 'dark-modern',
       name: 'Dark & Modern',
       design: {
           blocks: [
               { id: '1', type: 'box', style: { height: '60px', backgroundColor: '#18181b', borderRadius: '12px' } },
               { id: '2', type: 'text', content: 'Access Dashboard', style: { fontSize: '20px', fontWeight: '600', color: '#333', textAlign: 'center', marginTop: '20px' } },
               { id: '3', type: 'button', label: 'Authenticate', variant: 'primary' }
           ],
           theme: {
               primaryColor: '#18181b',
               borderRadius: '0.75rem',
               layout: 'modal',
               font: 'mono'
           }
       }
    }
  ]

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

      <div className="flex-1 overflow-y-auto p-4">
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
            <div className="space-y-3">
                 <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 px-1">
                    Starter Kits
                </h3>
                {templates.map(template => (
                    <button
                       key={template.id}
                       onClick={() => {
                           if (confirm('This will replace your current design. Continue?')) {
                               onApplyTemplate(template.design)
                           }
                       }}
                       className="w-full text-left p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all group"
                    >
                        <div className="h-20 bg-zinc-100 rounded-md mb-2 overflow-hidden relative border border-zinc-100">
                             {/* Mock Preview */}
                             <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                 <LayoutTemplate className="w-8 h-8 opacity-50" />
                             </div>
                        </div>
                        <span className="text-xs font-semibold text-zinc-700 group-hover:text-zinc-900 block">{template.name}</span>
                    </button>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}
