'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'


export function TartanInput({ 
    label, 
    id, 
    type = "text",
    placeholder,
    className,
    containerClassName,
    ...props 
}) {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState(props.value || '')

    return (
        <div className={cn("relative w-full group", containerClassName)}>
             {/* Gradient Border Effect */}
             <div className={cn(
                 "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 transition-opacity duration-300 blur",
                 focused ? "opacity-30" : "group-hover:opacity-10"
             )} />
             
             <div className="relative bg-white rounded-lg p-[1px]">
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-md border-0 bg-white px-3 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-transparent focus:outline-none sm:text-sm sm:leading-6 transition-all",
                        focused && "ring-0",
                        className
                    )}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => {
                        setValue(e.target.value)
                        props.onChange?.(e)
                    }}
                    {...props}
                />
            </div>
        </div>
    )
}
