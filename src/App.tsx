import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import AuthPage from './AuthPage'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './Dashboard'
import IngredientList from './IngredientList'
import Recipes from './Recipes'

function App() {
  const { token } = useAuth()

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <AuthPage />}
      />

      {/* Protected routes — must be logged in */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ingredients" element={<IngredientList />} />
          <Route path="/recipes" element={<Recipes />} />
        </Route>
      </Route>

      {/* Anything else → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App