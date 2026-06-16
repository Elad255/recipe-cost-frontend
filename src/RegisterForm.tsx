import { useState } from 'react'
import { useAuth } from './AuthContext'

function RegisterForm() {
  const { register} = useAuth()                    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()                                     
    try {
      await register(email, password)                
    } catch (err) {
      setError('Registration failed — try a different email')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password (min 8 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg">
        Sign Up
      </button>
    </form>
  )
}

export default RegisterForm