import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from './api'
import type { Recipe, RecipeListResponse, IngredientListResponse } from './types'

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#eab308', '#ef4444', '#8b5cf6']

function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [ingredientCount, setIngredientCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesRes = await api.get<RecipeListResponse>('/recipes/?size=100')
        setRecipes(recipesRes.data.items)
        const ingredientsRes = await api.get<IngredientListResponse>('/ingredients/?size=100')
        setIngredientCount(ingredientsRes.data.total)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>

  // --- derive the stats ---
  const totalRecipes = recipes.length

  const recipesWithMargin = recipes.filter((r) => r.profit_margin !== null)
  const avgMargin =
    recipesWithMargin.length > 0
      ? recipesWithMargin.reduce((sum, r) => sum + (r.profit_margin ?? 0), 0) /
        recipesWithMargin.length
      : 0

  // recipes with profit margin under 30% = the "warning" list
  const lowMargin = recipes.filter(                          
    (r) => r.profit_margin !== null && r.profit_margin < 30
  )

 // default to the first recipe with ingredients if none is chosen yet
const effectiveId = selectedRecipeId ?? recipes.find((r) => r.ingredients.length > 0)?.id ?? null
const chartRecipe = recipes.find((r) => r.id === effectiveId) ?? null
  
  // turn that recipe's ingredients into chart data: { name, value }
  const pieData =
    chartRecipe?.ingredients.map(                          
      (ri) => ({ name: ri.ingredient_name, value: ri.cost })
    ) ?? []

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-500 text-sm">Total Recipes</p>
          <p className="text-3xl font-bold text-gray-800">{totalRecipes}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-500 text-sm">Total Ingredients</p>
          <p className="text-3xl font-bold text-gray-800">{ingredientCount}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-500 text-sm">Avg Profit Margin</p>
          <p className="text-3xl font-bold text-green-600">{avgMargin.toFixed(1)}%</p>
        </div>
      </div>

      {/* Low-margin warnings */}
      <div className="bg-white rounded-lg p-6 shadow mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">⚠️ Low Margin Recipes</h2>
        {lowMargin.length === 0 ? (
          <p className="text-gray-500">All recipes have healthy margins. 🎉</p>
        ) : (
          <ul className="space-y-2">
            {lowMargin.map((r) => (
              <li key={r.id} className="flex justify-between border-b pb-1">
                <span className="text-gray-800">{r.name}</span>
                <span className="text-red-500 font-semibold">{r.profit_margin}%</span>
              </li>
            ))}
          </ul>
        )}
      </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Cost Breakdown{chartRecipe ? `: ${chartRecipe.name}` : ''}
      </h2>
      <select
          value={effectiveId ?? ''}
          onChange={(e) => setSelectedRecipeId(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
        >
          {recipes
            .filter((r) => r.ingredients.length > 0)
            .map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
        </select>
      {/* Cost breakdown pie chart */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Cost Breakdown{chartRecipe ? `: ${chartRecipe.name}` : ''}
        </h2>
        {pieData.length === 0 ? (
          <p className="text-gray-500">Add ingredients to a recipe to see its cost breakdown.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default Dashboard