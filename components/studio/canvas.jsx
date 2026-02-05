'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

export function Canvas({
  blocks,
  theme = {},
  onSelect,
  selectedId,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  })

  return (
    <div
      className="flex-1 bg-[#F3F4F6] flex items-center justify-center p-8 overflow-y-auto relative"
      onClick={() => onSelect(null)}
      style={{
           backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
           backgroundSize: '24px 24px'
      }}
    >
      <div
        ref={setNodeRef}
        className={cn(
          'bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 ring-1 ring-black/5',
          isOver ? 'ring-2 ring-blue-500 scale-[1.02]' : '',
          // Layout variants
          (!theme.layout || theme.layout === 'centered') && 'w-full max-w-[420px] min-h-[500px] p-8',
          theme.layout === 'split' && 'w-full max-w-[900px] h-[600px] flex items-center p-0 overflow-hidden',
          theme.layout === 'full' && 'w-full h-full max-w-none p-8 flex flex-col justify-center bg-transparent shadow-none ring-0',
          theme.layout === 'modal' && 'w-full max-w-[480px] p-10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/20'
        )}
        style={{
          borderRadius: theme.borderRadius,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn(
            "w-full h-full", 
            theme.font === 'serif' ? 'font-serif' : theme.font === 'mono' ? 'font-mono' : 'font-sans'
        )}>
           {theme.layout === 'split' && (
           <div className="w-1/2 h-full bg-zinc-100 border-r border-zinc-100 flex items-center justify-center overflow-hidden">
              <div className="text-zinc-300 text-6xl font-black opacity-20 rotate-12 select-none">IMAGE</div>
           </div>
        )}
        <div className={cn(
            theme.layout === 'split' ? "w-1/2 p-8" : "w-full",
            theme.layout === 'full' && "max-w-md mx-auto"
        )}>
        {blocks.length === 0 ? (
          <div className="h-full min-h-[436px] flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl p-8 gap-4 bg-zinc-50/50">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
               <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
            </div>
            <p className="text-sm font-medium">Drop blocks here</p>
          </div>
        ) : (
          <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
             <div className="space-y-4">
               {/* Mock visual header to make it look like a real browser window or app */}
               <div className="flex justify-center pb-2 opacity-50">
                    <div className="h-1 w-12 bg-zinc-200 rounded-full" />
               </div>
   
               {blocks.map((block) => (
                 <SortableBlock 
                   key={block.id} 
                   block={block} 
                   theme={theme} 
                   selectedId={selectedId} 
                   onSelect={onSelect} 
                 />
               ))}
             </div>
          </SortableContext>
        )}
        </div>
      </div>
    </div>
    </div>
  )
}

function SortableBlock({ block, theme, selectedId, onSelect }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ 
        id: block.id,
        data: {
          sortable: true
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        touchAction: 'none' // Prevent scrolling while dragging
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(block.id)
            }}
            className={cn(
              'relative group cursor-grab active:cursor-grabbing ring-2 ring-transparent hover:ring-blue-100 rounded-lg p-2 -m-2 transition-all outline-none',
              selectedId === block.id && 'ring-blue-500 bg-blue-50/10 z-10',
              isDragging && 'z-50 ring-2 ring-blue-500 shadow-xl bg-white'
            )}
        >
             <BlockRenderer block={block} theme={theme} />
            
             {selectedId === block.id && (
                <div className="absolute -right-3 -top-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md z-10 scale-0 group-hover:scale-100 transition-transform">
                   <div className="w-2 h-2 bg-white rounded-full" />
                </div>
             )}
             
             {/* Hover Handle Indicator */}
             {!isDragging && selectedId !== block.id && (
                 <div className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="h-6 w-1 rounded bg-zinc-200" />
                 </div>
             )}
        </div>
    )
}

function BlockRenderer({ block, theme }) {
  const commonInputStyles = "flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none disabled:cursor-pointer disabled:bg-zinc-50/50 font-sans transition-colors"
  const labelStyles = "text-sm font-medium text-zinc-900"

  switch (block.type) {
    case 'text':
      return (
          <div style={block.style}>
             {block.content || 'Double click to edit'}
          </div>
      )
    case 'input':
      return (
        <div className="space-y-2">
          {block.label && <label className={labelStyles}>{block.label}</label>}
          <input
            disabled
            type={block.inputType || 'text'}
            placeholder={block.placeholder}
            className={commonInputStyles}
            style={{ borderRadius: theme.borderRadius }}
          />
        </div>
      )
    case 'button':
      return (
        <button
          disabled
          className={cn(
              "flex h-11 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-100 shadow-sm",
              block.variant === 'primary' ? "text-white" : "bg-zinc-100 text-zinc-900"
          )}
          style={{
            backgroundColor: block.variant === 'primary' ? theme.primaryColor : undefined,
            borderRadius: theme.borderRadius,
          }}
        >
          {block.label || 'Button'}
        </button>
      )
    case 'box':
      return (
         <div 
            className="w-full rounded-lg border border-zinc-200"
            style={{
                ...block.style,
                borderRadius: theme.borderRadius
            }}
         />
      )
    case 'social':
       return (
           <div className="grid gap-2">
               <div className="relative flex justify-center text-xs uppercase my-2">
                  <span className="bg-white px-2 text-zinc-500 font-medium">Or continue with</span>
               </div>
               <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                  <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
                     <path
                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                       fill="#4285F4"
                     />
                     <path
                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                       fill="#34A853"
                     />
                     <path
                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                       fill="#FBBC05"
                     />
                     <path
                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                       fill="#EA4335"
                     />
                  </svg>
                  Google
               </button>
           </div>
       )
    case 'image':
      return (
        <div className="w-full flex justify-center">
            {block.src ? (
                <img 
                    src={block.src} 
                    alt={block.alt || 'Image'} 
                    className="max-w-full object-cover"
                    style={{
                        height: block.style?.height || 'auto',
                        width: block.style?.width || '100%',
                        borderRadius: theme.borderRadius
                    }}
                />
            ) : (
                <div 
                    className="w-full h-32 bg-zinc-100 border-2 border-dashed border-zinc-200 rounded-lg flex flex-col items-center justify-center text-zinc-400 gap-2"
                    style={{ borderRadius: theme.borderRadius }}
                >
                    <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-medium">No image selected</span>
                </div>
            )}
        </div>
      )
    default:
      return <div className="p-4 border border-red-200 bg-red-50 text-red-600">Unknown block type: {block.type}</div>
  }
}
