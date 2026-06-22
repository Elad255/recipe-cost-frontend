import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import type { Recipe, RecipeListResponse } from './types'
import Skeleton from './Skeleton'

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get<RecipeListResponse>('/recipes/')
        setRecipes(response.data.items)        
        setError(null)
      } catch (err) {
        setError('Failed to load recipes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  if (loading) return <Skeleton />
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Recipes</h1>
      <div className="grid gap-3">
        {recipes.map((recipe) => (              
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}        
            className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:border-orange-400 block"
          >
            <h3 className="font-bold text-gray-800">{recipe.name}</h3>
            <p className="text-gray-500 text-sm">{recipe.category} · {recipe.servings} servings</p>
            <p className="text-orange-500 font-semibold">
              Cost: ${recipe.total_cost} · {recipe.ingredients.length} ingredients
            </p>
          </Link>
        ))}
      </div>
      {recipes.length === 0 && (
        <p className="text-gray-500 mt-4">No recipes yet — create one in Swagger to get started.</p>
      )}
    </div>
  )
}

export default Recipes