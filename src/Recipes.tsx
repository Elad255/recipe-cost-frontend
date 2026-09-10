import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import type { Recipe, RecipeFormData, RecipeListResponse } from './types'
import Modal from './Modal'
import RecipeForm from './RecipeForm'
import Skeleton from './Skeleton'
import { useToast } from './ToastContext'

function Recipes() {
  const { showToast } = useToast()

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

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

  useEffect(() => {
    fetchRecipes()
  }, [])

  const handleSave = async (data: RecipeFormData) => {
    try {
      await api.post('/recipes/', data)
      setIsModalOpen(false)
      fetchRecipes()
      showToast('Recipe saved!', 'success')
    } catch (err) {
      console.error(err)
      showToast('Failed to save recipe', 'error')
    }
  }

  if (loading) return <Skeleton />
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          + Add Recipe
        </button>
      </div>
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
        <p className="text-gray-500 mt-4">No recipes yet — click “+ Add Recipe” to create one.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          initialData={null}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Recipes