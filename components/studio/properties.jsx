'use client'

import { Palette, Trash2 } from 'lucide-react'

export function Properties({
  selectedId,
  blocks,
  theme,
  onUpdate,
  onUpdateTheme,
}) {
  const selectedBlock = blocks.find((b) => b.id === selectedId)

  const updateBlock = (updates) => {
    onUpdate(blocks.map((b) => (b.id === selectedId ? { ...b, ...updates } : b)))
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this block?')) {
        onUpdate(blocks.filter(b => b.id !== selectedId))
    }
  }

  return (
    <div className="w-80 border-l border-zinc-200 bg-white shrink-0 h-full flex flex-col">
          <div className="h-14 border-b border-zinc-100 flex items-center px-6 bg-zinc-50/50">
             <div className="flex items-center gap-2 text-zinc-900 font-medium">
                <Palette className="w-4 h-4 text-zinc-500" />
                {selectedBlock ? 'Block Settings' : 'Global Styles'}
             </div>
          </div>

      <div className="p-6 overflow-y-auto flex-1">
          {!selectedBlock ? (
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Primary Color</label>
                <div className="flex items-center gap-3">
                   <div className="relative h-10 w-10 rounded-lg overflow-hidden ring-1 ring-zinc-200 shadow-sm transition-transform hover:scale-105 active:scale-95">
                       <input
                         type="color"
                         value={theme.primaryColor}
                         onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                         className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer p-0 border-0"
                       />
                   </div>
                   <input 
                     type="text" 
                     value={theme.primaryColor}
                     onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                     className="flex-1 h-10 rounded-lg border border-zinc-200 px-3 text-sm font-mono text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent uppercase"
                    />
                </div>
                <p className="text-xs text-zinc-400">Used for buttons and active states.</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Border Radius</label>
                <div className="grid grid-cols-5 gap-2">
                   {['0px', '0.25rem', '0.5rem', '1rem', '99px'].map((radius, i) => (
                      <button
                        key={radius}
                        onClick={() => onUpdateTheme({ ...theme, borderRadius: radius })}
                        className={`h-10 rounded-lg border transition-all ${theme.borderRadius === radius ? 'border-zinc-900 bg-zinc-900 text-white shadow-md' : 'border-zinc-200 hover:border-zinc-300 text-zinc-600'}`}
                        title={radius}
                      >
                         <div className="w-4 h-4 border-t-2 border-l-2 border-current mx-auto mt-1.5" style={{ borderRadius: i === 4 ? '50%' : radius === '0px' ? '0' : '4px' }} />
                      </button>
                   ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 mb-6">
                 <div className="text-xs font-medium text-zinc-500 mb-1">Editing</div>
                 <div className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                   {selectedBlock.type === 'email' && '✉️ Email Field'}
                   {selectedBlock.type === 'password' && '🔒 Password Field'}
                   {selectedBlock.type === 'header' && '📝 Header'}
                   {selectedBlock.type === 'button' && '🖱️ Button'}
                   {selectedBlock.type === 'social' && '🔗 Social Login'}
                 </div>
              </div>

              {(selectedBlock.type === 'header' || selectedBlock.type === 'button') && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-700">Text Content</label>
                  <input
                    type="text"
                    value={selectedBlock.type === 'header' ? selectedBlock.content : selectedBlock.label}
                    onChange={(e) =>
                      updateBlock(
                        selectedBlock.type === 'header'
                          ? { content: e.target.value }
                          : { label: e.target.value }
                      )
                    }
                    className="w-full h-10 rounded-lg border border-zinc-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                  />
                </div>
              )}

              {(selectedBlock.type === 'email' || selectedBlock.type === 'password') && (
                 <>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-700">Label</label>
                      <input
                        type="text"
                        value={selectedBlock.label}
                        onChange={(e) => updateBlock({ label: e.target.value })}
                         className="w-full h-10 rounded-lg border border-zinc-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-700">Placeholder</label>
                      <input
                        type="text"
                        value={selectedBlock.placeholder}
                        onChange={(e) => updateBlock({ placeholder: e.target.value })}
                         className="w-full h-10 rounded-lg border border-zinc-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                      />
                    </div>
                 </>
              )}
              
              <div className="pt-8 mt-4 border-t border-zinc-100">
                  <button 
                    onClick={handleDelete}
                    className="flex w-full items-center justify-center gap-2 h-10 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all"
                  >
                      <Trash2 className="w-4 h-4" />
                      Delete Block
                  </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
