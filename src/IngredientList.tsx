import { useState, useEffect } from 'react'
import api from './api'
import type { Ingredient, IngredientListResponse } from './types'

function IngredientList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await api.get<IngredientListResponse>('/ingredients/')
        setIngredients(response.data.items)
        setError(null)
      } catch (err) {
        setError('Failed to load ingredients')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchIngredients()
  }, [])

  if (loading) return <p className="text-gray-500">Loading ingredients...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Ingredients</h1>
      <div className="grid gap-3">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <h3 className="font-bold text-gray-800">{ingredient.name}</h3>
            <p className="text-gray-500 text-sm">{ingredient.category}</p>
            <p className="text-orange-500 font-semibold">
              ${ingredient.price_per_unit} / {ingredient.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IngredientList