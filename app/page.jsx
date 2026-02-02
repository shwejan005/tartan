'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const res = await fetch(`/api/auth/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error)
      
      alert('Success! ' + (isLogin ? 'Logged in' : 'Account created'))
      router.push('/studio/demo-project-id') 
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Tartan.</h1>
          <p className="mt-2 text-zinc-400">Design your authentication flow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700 rounded-md p-2 text-white"
            />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Password</label>
             <input 
               type="password" 
               value={password}
               onChange={e => setPassword(e.target.value)}
               className="w-full bg-zinc-800 border-zinc-700 rounded-md p-2 text-white"
             />
          </div>
          <button className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-zinc-200 transition">
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 cursor-pointer hover:text-white" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
        </p>

        <div className="pt-8 border-t border-zinc-900 text-center">
             <p className="text-xs text-zinc-600">Quick Links (For Development)</p>
             <div className="flex gap-4 justify-center mt-2 text-sm text-blue-400">
                <a href="/studio/demo" className="hover:underline">Studio Demo</a>
                <a href="/auth/demo" className="hover:underline">Hosted Page Demo</a>
             </div>
        </div>
      </div>
    </div>
  )
}
