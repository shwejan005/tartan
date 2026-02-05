'use client'
import React, { useEffect, useRef } from 'react'

export function BackgroundBeams({ className }) {
    // Simple CSS-based gradient animation for performance and reliability
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
             <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[100px] animate-pulse-slow" />
             <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 blur-[120px] animate-blob" />
             <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-pink-100/40 blur-[90px] animate-pulse-slow delay-1000" />
             
             {/* Grid Pattern Overlay */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
             <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: 'linear-gradient(#f1f1f1 1px, transparent 1px), linear-gradient(90deg, #f1f1f1 1px, transparent 1px)', 
                    backgroundSize: '40px 40px',
                    opacity: 0.3 
                }} 
             />
        </div>
    )
}
