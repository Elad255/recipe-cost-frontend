import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="text-orange-500 text-sm underline"
      >
        {showLogin ? "Need an account? Sign up" : "Have an account? Log in"}
      </button>
    </div>
  )
}

export default AuthPage