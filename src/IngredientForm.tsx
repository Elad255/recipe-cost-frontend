import { useState } from 'react'
import type { Ingredient, IngredientFormData } from './types'

interface IngredientFormProps {
  initialData: Ingredient | null
  onSave: (data: IngredientFormData) => void
  onCancel: () => void
}

function IngredientForm({ initialData, onSave, onCancel }: IngredientFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [category, setCategory] = useState(initialData?.category ?? '')
  const [unit, setUnit] = useState(initialData?.unit ?? '')
  const [price, setPrice] = useState(initialData?.price_per_unit?.toString() ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()                                  
    onSave({
      name,
      category,
      unit,
      price_per_unit: parseFloat(price),         // text → number 
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-800">
        {initialData ? 'Edit Ingredient' : 'Add Ingredient'}
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}  
        placeholder="Category"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        value={unit}                            
        onChange={(e) => setUnit(e.target.value)}
        placeholder="Unit (kg, l, pcs)"
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price per unit"
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

export default IngredientForm