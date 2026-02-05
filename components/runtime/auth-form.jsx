'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TartanInput } from '@/components/ui/tartan/input'
import { TartanButton } from '@/components/ui/tartan/button'
import { cn } from '@/lib/utils'

export function AuthForm({ blocks, theme }) {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Determine if login or signup based on fields present
  // This is a simple heuristic; in a real app, design metadata should specify the action
  const hasNameField = blocks.some(b => b.type === 'input' && b.label?.toLowerCase().includes('name'))
  const action = hasNameField ? 'signup' : 'login'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/auth/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      // On success, redirect or show success
      // For now, we'll just alert and reload/redirect to dashboard
      // In a real embed, we'd postMessage to parent
      alert(`Successfully ${action === 'signup' ? 'signed up' : 'logged in'}!`)
      window.location.href = '/dashboard' // Or wherever the app should go

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Map internal block types/IDs to API expectations
  // We assume inputs with type 'email' map to 'email', 'password' to 'password'
  // and inputs with label 'Name' map to 'name'
  const handleInputChange = (block, e) => {
      let key = block.id
      if (block.inputType === 'email') key = 'email'
      if (block.inputType === 'password') key = 'password'
      if (block.label?.toLowerCase().includes('name')) key = 'name'
      
      handleChange(key, e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {blocks.map((block) => {
        switch (block.type) {
          case 'text':
             return (
                <div key={block.id} style={block.style} className="mb-4">
                  {block.content}
                </div>
             )
          case 'input':
            return (
              <TartanInput
                key={block.id}
                label={block.label}
                type={block.inputType || 'text'}
                placeholder={block.placeholder}
                required
                onChange={(e) => handleInputChange(block, e)}
              />
            )
          case 'button':
            return (
              <TartanButton
                key={block.id}
                type="submit"
                variant={block.variant}
                disabled={loading}
                style={{
                    backgroundColor: block.variant === 'primary' ? theme.primaryColor : undefined,
                    borderRadius: theme.borderRadius,
                }}
              >
                {loading ? 'Thinking...' : block.label || 'Submit'}
              </TartanButton>
            )
          case 'social':
             return (
                <div key={block.id} className="grid gap-2 mt-4">
                    <div className="relative flex justify-center text-xs uppercase my-2">
                       <span className="bg-transparent px-2 text-zinc-500 font-medium">Or continue with</span>
                    </div>
                    {/* Social buttons would need separate handlers */}
                    <button type="button" className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">
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
                 <div key={block.id} className="w-full flex justify-center mb-6">
                     {block.src && (
                         <img 
                             src={block.src} 
                             alt={block.alt} 
                             className="max-w-full object-cover"
                             style={{
                                 height: block.style?.height || 'auto',
                                 width: block.style?.width || '100%',
                                 borderRadius: theme.borderRadius
                             }}
                         />
                     )}
                 </div>
             )
          default:
            return null
        }
      })}
    </form>
  )
}
