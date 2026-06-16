import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import api from './api'

interface AuthContextType {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const login = async (email: string, password: string) => {
    const response = await api.post<{ access_token: string }>('/auth/login', {
      email,
      password,
    })
    const newToken = response.data.access_token
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const register = async (email: string, password: string) => {
    await api.post('/auth/register', { email, password })
    await login(email, password) // auto-login right after registering
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}