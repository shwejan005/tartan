'use client'
import { cn } from '@/lib/utils'

export function TartanButton({ 
    children, 
    variant = 'primary', 
    className, 
    style,
    ...props 
}) {
    return (
        <button
            className={cn(
                "relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md font-medium transition-all duration-200 active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
                // Primary Variant (Black/Dark)
                variant === 'primary' && [
                   "bg-zinc-900 text-white shadow-lg hover:bg-zinc-800",
                   "after:absolute after:inset-0 after:z-[-1] after:h-full after:w-full after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:-translate-x-full hover:after:animate-shimmer"
                ],
                // Secondary/Outline Variant
                variant === 'secondary' && "bg-white text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50",
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </button>
    )
}
