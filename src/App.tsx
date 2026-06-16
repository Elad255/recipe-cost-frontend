import { useAuth } from './AuthContext'
import AuthPage from './AuthPage'
import IngredientList from './IngredientList'

function App() {
  const { token, logout } = useAuth()

  if (!token) return <AuthPage />

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Ingredients</h1>
        <button onClick={logout} className="text-gray-500 underline">Log out</button>
      </div>
      <IngredientList />
    </div>
  )
}

export default App