'use client'

import { Palette, Trash2, LayoutTemplate, Type } from 'lucide-react'

export function Properties({
  selectedId,
  blocks,
  theme = {},
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

  const PropertySection = ({ title, children }) => (
    <div className="space-y-3 py-4 border-b border-zinc-100 last:border-0">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">{title}</label>
      <div className="space-y-3 px-1">
        {children}
      </div>
    </div>
  )

  const PropertyRow = ({ label, children }) => (
    <div className="flex items-center justify-between gap-4">
       <span className="text-xs font-medium text-zinc-600 shrink-0">{label}</span>
       <div className="flex-1 min-w-0">
         {children}
       </div>
    </div>
  )

  return (
    <div className="w-72 border-l border-zinc-200 bg-white shrink-0 h-full flex flex-col">
       {/* Header */}
          <div className="h-12 border-b border-zinc-200 flex items-center px-4 bg-zinc-50/30 backdrop-blur-xl">
             <div className="flex items-center gap-2 text-zinc-900 font-semibold text-xs uppercase tracking-wider">
                {selectedBlock ? (
                    <>
                       <span className="w-2 h-2 rounded-full bg-blue-500" />
                       {selectedBlock.type}
                    </>
                ) : (
                    <>
                       <LayoutTemplate className="w-3 h-3" />
                       Canvas
                    </>
                )}
             </div>
          </div>

      <div className="p-4 overflow-y-auto flex-1">
          {!selectedBlock ? (
            <div className="space-y-2">
               <PropertySection title="Layout">
                  <div className="grid grid-cols-2 gap-2">
                    {['centered', 'split', 'full', 'modal'].map((layout) => (
                        <button
                          key={layout}
                          onClick={() => onUpdateTheme({ ...theme, layout })}
                          className={`h-16 rounded border flex flex-col items-center justify-center gap-2 transition-all ${
                            (theme.layout || 'centered') === layout 
                              ? 'border-blue-500 bg-blue-50/50 text-blue-600' 
                              : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:bg-zinc-50'
                          }`}
                        >
                           <span className="text-[10px] font-semibold capitalize">{layout}</span>
                        </button>
                    ))}
                 </div>
               </PropertySection>

               <PropertySection title="Typography">
                 <PropertyRow label="Font">
                      <select
                        value={theme.font || 'sans'}
                        onChange={(e) => onUpdateTheme({ ...theme, font: e.target.value })}
                        className="w-full h-8 rounded border border-zinc-200 px-2 text-xs bg-transparent focus:outline-none focus:border-zinc-400"
                      >
                        <option value="sans">Inter</option>
                        <option value="serif">Merriweather</option>
                        <option value="mono">JetBrains Mono</option>
                      </select>
                 </PropertyRow>
               </PropertySection>

               <PropertySection title="Appearance">
                 <PropertyRow label="Primary">
                    <div className="flex items-center gap-2">
                       <input
                         type="color"
                         value={theme.primaryColor}
                         onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                         className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0.5 bg-white"
                       />
                       <span className="text-xs font-mono text-zinc-500 uppercase">{theme.primaryColor}</span>
                    </div>
                 </PropertyRow>
                 <PropertyRow label="Radius">
                    <select
                        value={theme.borderRadius || '0.5rem'}
                        onChange={(e) => onUpdateTheme({ ...theme, borderRadius: e.target.value })}
                        className="w-full h-8 rounded border border-zinc-200 px-2 text-xs bg-transparent focus:outline-none focus:border-zinc-400"
                      >
                        <option value="0px">None</option>
                        <option value="0.25rem">Small</option>
                        <option value="0.5rem">Medium</option>
                        <option value="1rem">Large</option>
                        <option value="99px">Full</option>
                      </select>
                 </PropertyRow>
               </PropertySection>
            </div>
          ) : (
            <div className="space-y-2">
               <PropertySection title="Content">
                  {selectedBlock.type === 'input' && (
                     <>
                        <PropertyRow label="Label">
                           <input 
                              type="text" 
                              value={selectedBlock.label || ''} 
                              onChange={(e) => updateBlock({ label: e.target.value })}
                              className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                        </PropertyRow>
                        <PropertyRow label="Placeholder">
                           <input 
                              type="text" 
                              value={selectedBlock.placeholder || ''} 
                              onChange={(e) => updateBlock({ placeholder: e.target.value })}
                              className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                        </PropertyRow>
                        <PropertyRow label="Type">
                             <select
                                value={selectedBlock.inputType || 'text'}
                                onChange={(e) => updateBlock({ inputType: e.target.value })}
                                className="w-full h-8 rounded border border-zinc-200 px-2 text-xs bg-transparent focus:outline-none focus:border-blue-500"
                              >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="password">Password</option>
                              </select>
                        </PropertyRow>
                     </>
                  )}
                  {(selectedBlock.type === 'text' || selectedBlock.type === 'button') && (
                     <>
                        <PropertyRow label="Text">
                              <input 
                                 type="text" 
                                 value={selectedBlock.type === 'text' ? selectedBlock.content : selectedBlock.label} 
                                 onChange={(e) => selectedBlock.type === 'text' ? updateBlock({ content: e.target.value }) : updateBlock({ label: e.target.value })}
                                 className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                              />
                        </PropertyRow>
                        {selectedBlock.type === 'text' && (
                             <PropertySection title="Typography">
                                <PropertyRow label="Size">
                                     <input
                                      type="text"
                                      value={selectedBlock.style?.fontSize || '16px'}
                                      onChange={(e) => updateBlock({ style: { ...selectedBlock.style, fontSize: e.target.value } })}
                                      className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                                    />
                                </PropertyRow>
                                <PropertyRow label="Weight">
                                     <select
                                       value={selectedBlock.style?.fontWeight || '400'}
                                       onChange={(e) => updateBlock({ style: { ...selectedBlock.style, fontWeight: e.target.value } })}
                                       className="w-full h-8 rounded border border-zinc-200 px-2 text-xs bg-transparent focus:outline-none focus:border-blue-500"
                                     >
                                         <option value="300">Light</option>
                                         <option value="400">Regular</option>
                                         <option value="500">Medium</option>
                                         <option value="600">Semibold</option>
                                         <option value="700">Bold</option>
                                         <option value="900">Black</option>
                                     </select>
                                </PropertyRow>
                                <PropertyRow label="Align">
                                     <div className="flex bg-zinc-100 rounded p-1 gap-1">
                                         {['left', 'center', 'right'].map(align => (
                                             <button
                                                key={align}
                                                onClick={() => updateBlock({ style: { ...selectedBlock.style, textAlign: align } })}
                                                className={`flex-1 h-6 rounded text-xs capitalize ${selectedBlock.style?.textAlign === align ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-zinc-700'}`}
                                             >
                                                {align[0]}
                                             </button>
                                         ))}
                                     </div>
                                </PropertyRow>
                                <PropertyRow label="Color">
                                    <input
                                      type="color"
                                      value={selectedBlock.style?.color || '#000000'}
                                      onChange={(e) => updateBlock({ style: { ...selectedBlock.style, color: e.target.value } })}
                                      className="w-full h-8 rounded border border-zinc-200 cursor-pointer p-0.5 bg-white"
                                    />
                                </PropertyRow>
                             </PropertySection>
                        )}
                     </>
                  )}
               </PropertySection>

                {selectedBlock.type === 'button' && (
                   <PropertySection title="Variant">
                      <div className="grid grid-cols-2 gap-2">
                          <button 
                             onClick={() => updateBlock({ variant: 'primary' })}
                             className={`h-8 rounded border text-xs font-medium ${selectedBlock.variant !== 'secondary' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200'}`}
                          >
                             Primary
                          </button>
                          <button 
                             onClick={() => updateBlock({ variant: 'secondary' })}
                             className={`h-8 rounded border text-xs font-medium ${selectedBlock.variant === 'secondary' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200'}`}
                          >
                             Secondary
                          </button>
                      </div>
                   </PropertySection>
                )}

                {selectedBlock.type === 'box' && (
                   <PropertySection title="Style">
                       <PropertyRow label="Background">
                            <input
                             type="color"
                             value={selectedBlock.style?.backgroundColor || '#f4f4f5'}
                             onChange={(e) => updateBlock({ style: { ...selectedBlock.style, backgroundColor: e.target.value } })}
                             className="w-full h-8 rounded border border-zinc-200 cursor-pointer p-0.5 bg-white"
                           />
                       </PropertyRow>
                       <PropertyRow label="Width">
                            <input
                             type="text"
                             value={selectedBlock.style?.width || '100%'}
                             onChange={(e) => updateBlock({ style: { ...selectedBlock.style, width: e.target.value } })}
                             className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                       </PropertyRow>
                       <PropertyRow label="Height">
                            <input
                             type="text"
                             value={selectedBlock.style?.height || '100px'}
                             onChange={(e) => updateBlock({ style: { ...selectedBlock.style, height: e.target.value } })}
                             className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                       </PropertyRow>
                       <PropertyRow label="Radius">
                            <input
                             type="text"
                             value={selectedBlock.style?.borderRadius || '0px'}
                             onChange={(e) => updateBlock({ style: { ...selectedBlock.style, borderRadius: e.target.value } })}
                             className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                       </PropertyRow>
                   </PropertySection>
                )}

                {selectedBlock.type === 'image' && (
                   <PropertySection title="Image Details">
                       <PropertyRow label="Source URL">
                            <input
                             type="text"
                             placeholder="https://..."
                             value={selectedBlock.src || ''}
                             onChange={(e) => updateBlock({ src: e.target.value })}
                             className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                       </PropertyRow>
                       <PropertyRow label="Alt Text">
                            <input
                             type="text"
                             placeholder="Image description"
                             value={selectedBlock.alt || ''}
                             onChange={(e) => updateBlock({ alt: e.target.value })}
                             className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                           />
                       </PropertyRow>
                       <PropertySection title="Style">
                            <PropertyRow label="Width">
                                    <input
                                    type="text"
                                    value={selectedBlock.style?.width || '100%'}
                                    onChange={(e) => updateBlock({ style: { ...selectedBlock.style, width: e.target.value } })}
                                    className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                                />
                            </PropertyRow>
                            <PropertyRow label="Height">
                                    <input
                                    type="text"
                                    value={selectedBlock.style?.height || 'auto'}
                                    onChange={(e) => updateBlock({ style: { ...selectedBlock.style, height: e.target.value } })}
                                    className="w-full h-8 rounded border border-zinc-200 px-2 text-xs focus:outline-none focus:border-blue-500"
                                />
                            </PropertyRow>
                       </PropertySection>
                   </PropertySection>
                )}
              
               <div className="pt-8 mt-4 border-t border-zinc-100">
                  <button 
                    onClick={handleDelete}
                    className="flex w-full items-center justify-center gap-2 h-8 rounded border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 hover:border-red-300 transition-all uppercase tracking-wide"
                  >
                      <Trash2 className="w-3 h-3" />
                      Delete Layer
                  </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
