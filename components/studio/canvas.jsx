'use client'

import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export function Canvas({
  blocks,
  theme,
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
          'w-full max-w-[400px] bg-white shadow-2xl min-h-[500px] p-8 transition-all duration-300 ring-1 ring-black/5',
          isOver ? 'ring-2 ring-blue-500 scale-[1.02]' : ''
        )}
        style={{
          borderRadius: theme.borderRadius,
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
          <div className="space-y-5">
             {/* Mock visual header to make it look like a real browser window or app */}
            <div className="flex justify-center pb-4">
                 <div className="h-1 w-12 bg-zinc-100 rounded-full" />
            </div>

            {blocks.map((block) => (
              <div
                key={block.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(block.id)
                }}
                className={cn(
                  'relative group cursor-pointer ring-2 ring-transparent hover:ring-blue-100 rounded-lg p-2 -m-2 transition-all',
                  selectedId === block.id && 'ring-blue-500 bg-blue-50/10'
                )}
              >
                <BlockRenderer block={block} theme={theme} />
                
                {selectedId === block.id && (
                   <div className="absolute -right-3 -top-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md z-10">
                      <div className="w-2 h-2 bg-white rounded-full" />
                   </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BlockRenderer({ block, theme }) {
  const commonInputStyles = "flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none disabled:cursor-pointer disabled:bg-zinc-50/50 font-sans transition-colors"
  const labelStyles = "text-sm font-medium text-zinc-900"

  switch (block.type) {
    case 'header':
      return <h1 className="text-2xl font-bold text-center text-zinc-900 tracking-tight">{block.content || 'Welcome'}</h1>
    case 'email':
      return (
        <div className="space-y-2">
          <label className={labelStyles}>{block.label || 'Email'}</label>
          <input
            disabled
            type="email"
            placeholder={block.placeholder}
            className={commonInputStyles}
            style={{ borderRadius: theme.borderRadius }}
          />
        </div>
      )
    case 'password':
      return (
        <div className="space-y-2">
           <div className="flex justify-between items-center">
             <label className={labelStyles}>{block.label || 'Password'}</label>
             <span className="text-xs text-zinc-500 hover:text-zinc-900 cursor-pointer hover:underline">Forgot?</span>
           </div>
          <input
            disabled
            type="password"
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
          className="flex h-11 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-100 shadow-sm"
          style={{
            backgroundColor: theme.primaryColor,
            borderRadius: theme.borderRadius,
          }}
        >
          {block.label || 'Sign In'}
        </button>
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
    default:
      return <div className="p-4 border border-red-200 bg-red-50 text-red-600">Unknown block type</div>
  }
}
