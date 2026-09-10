import { useState } from 'react'
import type { Recipe, RecipeFormData } from './types'

interface RecipeFormProps {
  initialData: Recipe | null
  onSave: (data: RecipeFormData) => void
  onCancel: () => void
}

function RecipeForm({ initialData, onSave, onCancel }: RecipeFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [category, setCategory] = useState(initialData?.category ?? '')
  const [servings, setServings] = useState(initialData?.servings?.toString() ?? '')
  const [sellingPrice, setSellingPrice] = useState(initialData?.selling_price?.toString() ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !category.trim() || !servings) {
      alert('Please fill in name, category and servings')
      return
    }
    onSave({
      name,
      description: description.trim() || null,
      category,
      servings: parseInt(servings, 10),
      selling_price: sellingPrice ? parseFloat(sellingPrice) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-800">
        {initialData ? 'Edit Recipe' : 'Add Recipe'}
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (Dessert, Main, ...)"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        type="number"
        min="1"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        placeholder="Servings"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        type="number"
        step="0.01"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        placeholder="Selling price (optional)"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="text-gray-500 px-4 py-2">
          Cancel
        </button>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
          Save
        </button>
      </div>
    </form>
  )
}

export default RecipeForm
