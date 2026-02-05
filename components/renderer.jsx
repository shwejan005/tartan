import { cn } from '@/lib/utils'

export function Renderer({ design }) {
    const { blocks = [], theme = {} } = design;

    return (
        <div
            className={cn(
                'bg-white shadow-2xl transition-all duration-300 ring-1 ring-black/5',
                (!theme.layout || theme.layout === 'centered') && 'w-full max-w-[420px] min-h-[500px] p-8',
                theme.layout === 'split' && 'w-full max-w-[900px] h-[600px] flex items-center p-0 overflow-hidden',
                theme.layout === 'full' && 'w-full h-full max-w-none p-8 flex flex-col justify-center bg-transparent shadow-none ring-0',
                theme.layout === 'modal' && 'w-full max-w-[480px] p-10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/20'
            )}
            style={{
                borderRadius: theme.borderRadius,
            }}
        >
            <div className={cn(
                "w-full h-full",
                theme.font === 'serif' ? 'font-serif' : theme.font === 'mono' ? 'font-mono' : 'font-sans'
            )}>
                {theme.layout === 'split' && (
                    <div className="w-1/2 h-full bg-zinc-100 border-r border-zinc-100 flex items-center justify-center overflow-hidden">
                        {/* Placeholder for image - in real app would come from theme/config */}
                        <div className="text-zinc-300 text-6xl font-black opacity-20 rotate-12 select-none">IMAGE</div>
                    </div>
                )}
                <div className={cn(
                    theme.layout === 'split' ? "w-1/2 p-8" : "w-full",
                    theme.layout === 'full' && "max-w-md mx-auto"
                )}>
                    <div className="space-y-4">
                        {blocks.map((block) => (
                            <div key={block.id} className="relative">
                                <BlockRenderer block={block} theme={theme} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function BlockRenderer({ block, theme }) {
    const commonInputStyles = "flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans transition-all"
    const labelStyles = "text-sm font-medium text-zinc-900"

    switch (block.type) {
        case 'text':
            return (
                <div style={block.style}>
                    {block.content}
                </div>
            )
        case 'input':
            return (
                <div className="space-y-2">
                    {block.label && <label className={labelStyles}>{block.label}</label>}
                    <input
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
                    className={cn(
                        "flex h-11 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] shadow-sm",
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
                    ) : null}
                </div>
            )
        default:
            return null
    }
}
