import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Layout() {
  const { logout } = useAuth()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-orange-500 font-semibold'
      : 'text-gray-600 hover:text-orange-500'

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/ingredients" className={linkClass}>Ingredients</NavLink>
          <NavLink to="/recipes" className={linkClass}>Recipes</NavLink>
        </div>
        <button onClick={logout} className="text-gray-500 underline">Log out</button>
      </nav>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout