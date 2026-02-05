import { cn } from '@/lib/utils'
import { BackgroundBeams } from '@/components/ui/tartan/background-beams'
import { TartanCard } from '@/components/ui/tartan/card'
import { AuthForm } from '@/components/runtime/auth-form'

export function Renderer({ design }) {
    const { blocks = [], theme = {} } = design || {};

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* Background */}
             <BackgroundBeams className="-z-10" />

             {/* Main Card Container */}
             <TartanCard 
                className={cn(
                    "w-full transition-all duration-300",
                    (!theme.layout || theme.layout === 'centered') && 'max-w-[480px] p-8',
                    theme.layout === 'split' && 'max-w-[1000px] grid grid-cols-2 p-0 overflow-hidden',
                    theme.layout === 'full' && 'h-full max-w-none bg-transparent shadow-none border-0 backdrop-blur-none',
                    theme.layout === 'modal' && 'max-w-[480px] p-10'
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
                        <div className="relative h-full bg-zinc-100 border-r border-zinc-100 hidden md:flex items-center justify-center overflow-hidden">
                             {/* Decorative Image/Pattern for split layout */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10" />
                            <div className="text-zinc-900/10 text-6xl font-black rotate-12 select-none">TARTAN</div>
                        </div>
                    )}
                    
                    <div className={cn(
                        "flex flex-col justify-center",
                        theme.layout === 'split' ? "w-full p-12" : "w-full",
                        theme.layout === 'full' && "max-w-md mx-auto h-full"
                    )}>
                        <AuthForm blocks={blocks} theme={theme} />
                    </div>
                 </div>
             </TartanCard>
        </div>
    )
}

