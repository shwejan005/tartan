'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AuthRenderer({ design, projectId }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('login')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      alert(`Success! Logged in as ${data.user.email}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("w-full max-w-md bg-white shadow-xl overflow-hidden p-8")}
      style={{ borderRadius: design.theme.borderRadius }}
    >
      <div className="space-y-4">
        {design.blocks.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            This login page is empty. Configure it in Tartan Studio.
          </div>
        ) : (
          design.blocks.map(block => (
             <RuntimeBlock 
                key={block.id} 
                block={block} 
                theme={design.theme} 
                value={formData}
                onChange={(key, val) => setFormData(prev => ({ ...prev, [key]: val }))}
                loading={loading}
             />
          ))
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        {mode === 'login' ? (
           <>
             Don&apos;t have an account?{' '}
             <button type="button" onClick={() => setMode('signup')} className="font-medium underline hover:text-gray-800">Sign up</button>
           </>
        ) : (
           <>
             Already have an account?{' '}
             <button type="button" onClick={() => setMode('login')} className="font-medium underline hover:text-gray-800">Log in</button>
           </>
        )}
      </div>
    </form>
  )
}

function RuntimeBlock({ 
    block, 
    theme, 
    value, 
    onChange,
    loading 
}) {
    switch (block.type) {
        case 'header':
            return <h1 className="text-2xl font-bold text-center text-gray-900">{block.content || 'Welcome'}</h1>
        case 'email':
            return (
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">{block.label || 'Email'}</label>
                    <input
                        required
                        type="email"
                        placeholder={block.placeholder}
                        value={value.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ borderRadius: theme.borderRadius }}
                    />
                </div>
            )
        case 'password':
             return (
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">{block.label || 'Password'}</label>
                    <input
                        required
                        type="password"
                        placeholder={block.placeholder}
                        value={value.password}
                        onChange={(e) => onChange('password', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ borderRadius: theme.borderRadius }}
                    />
                </div>
            )
        case 'button':
            return (
                <button
                    type="submit"
                    disabled={loading}
                    className="flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    style={{
                        backgroundColor: theme.primaryColor,
                        borderRadius: theme.borderRadius,
                    }}
                >
                    {loading ? 'Loading...' : block.label || 'Sign In'}
                </button>
            )
        case 'social':
             return (
                <div className="flex gap-2 justify-center">
                    <button type="button" className="flex-1 h-10 border rounded flex items-center justify-center gap-2 hover:bg-gray-50 text-sm font-medium transition-colors">
                        Sign in with Google
                    </button>
                </div>
            )
        default:
            return null
    }
}
