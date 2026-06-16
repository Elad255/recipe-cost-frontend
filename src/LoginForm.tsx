import { useState } from 'react'
import { useAuth } from './AuthContext'

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      setError('Login failed — check your email and password')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <h2 className="text-2xl font-bold text-gray-800">Log In</h2>
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
      >
        Log In
      </button>
    </form>
  )
}

export default LoginForm