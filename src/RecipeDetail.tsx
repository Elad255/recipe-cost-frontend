import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from './api'
import type { Recipe, Ingredient, IngredientListResponse } from './types'

function RecipeDetail() {
  const { id } = useParams()

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // add-ingredient form state
  const [selectedIngredientId, setSelectedIngredientId] = useState('')
  const [quantity, setQuantity] = useState('')

  const fetchRecipe = async () => {
    try {
      const response = await api.get<Recipe>(`/recipes/${id}`)
      setRecipe(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load recipe')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipe()
    api.get<IngredientListResponse>('/ingredients/?size=100').then((res) => {
      setAllIngredients(res.data.items)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleAddIngredient = async () => {
    if (!selectedIngredientId || !quantity) return
    try {
      await api.post(`/recipes/${id}/ingredients`, {
        ingredient_id: Number(selectedIngredientId),
        quantity: parseFloat(quantity),
      })
      setSelectedIngredientId('')
      setQuantity('')
      fetchRecipe()   // refetch → costs recalculate automatically
    } catch (err) {
      console.error(err)
      alert('Failed to add ingredient')
    }
  }

  const handleRemoveIngredient = async (ingredientId: number) => {
    try {
      await api.delete(`/recipes/${id}/ingredients/${ingredientId}`)
      fetchRecipe()
    } catch (err) {
      console.error(err)
      alert('Failed to remove ingredient')
    }
  }

  if (loading) return <p className="text-gray-500">Loading recipe...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!recipe) return null

  return (
    <div>
      <Link to="/recipes" className="text-orange-500 text-sm">← Back to recipes</Link>

      <h1 className="text-3xl font-bold text-gray-800 mt-2">{recipe.name}</h1>
      <p className="text-gray-500 mb-4">{recipe.description}</p>

      {/* Cost summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Total Cost</p>
          <p className="text-xl font-bold text-gray-800">${recipe.total_cost}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Cost / Serving</p>
          <p className="text-xl font-bold text-gray-800">${recipe.cost_per_serving}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Selling Price</p>
          <p className="text-xl font-bold text-gray-800">
            {recipe.selling_price ? `$${recipe.selling_price}` : '—'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Profit Margin</p>
          <p className="text-xl font-bold text-green-600">
            {recipe.profit_margin !== null ? `${recipe.profit_margin}%` : '—'}
          </p>
        </div>
      </div>

      {/* Ingredients in this recipe */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">Ingredients</h2>
      <div className="grid gap-2 mb-6">
        {recipe.ingredients.map((ri) => (
          <div
            key={ri.ingredient_id}
            className="bg-white rounded-lg p-3 shadow flex justify-between items-center"
          >
            <div>
              <span className="font-semibold text-gray-800">{ri.ingredient_name}</span>
              <span className="text-gray-500 text-sm"> — {ri.quantity} {ri.unit} (${ri.cost})</span>
            </div>
            <button
              onClick={() => handleRemoveIngredient(ri.ingredient_id)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        {recipe.ingredients.length === 0 && (
          <p className="text-gray-500">No ingredients yet — add some below.</p>
        )}
      </div>

      {/* Add ingredient */}
      <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-3 items-end">
        <select
          value={selectedIngredientId}
          onChange={(e) => setSelectedIngredientId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Choose ingredient...</option>
          {allIngredients.map((ing) => (
            <option key={ing.id} value={ing.id}>{ing.name}</option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border border-gray-300 rounded-lg px-3 py-2 w-32"
        />
        <button
          onClick={handleAddIngredient}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail