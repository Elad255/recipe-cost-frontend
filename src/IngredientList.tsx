import { useState, useEffect } from 'react'
import api from './api'
import type { Ingredient, IngredientListResponse, IngredientFormData } from './types'
import Modal from './Modal'
import IngredientForm from './IngredientForm'
import Skeleton from './Skeleton'
import { useToast } from './ToastContext'

function IngredientList() {
  const { showToast } = useToast()

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // --- filter / sort / pagination state ---
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // --- modal / editing state (from Day 7) ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)

  // debounce the search box
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const fetchIngredients = async () => {
    try {
      const response = await api.get<IngredientListResponse>('/ingredients/', {
        params: {
          search: debouncedSearch || undefined,
          category: category || undefined,
          sort_by: sortBy,
          order,
          page,
          size: 2,
        },
      })
      setIngredients(response.data.items)
      setTotalPages(response.data.pages)
      setError(null)
    } catch (err) {
      setError('Failed to load ingredients')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // refetch whenever a filter / sort / page changes
  useEffect(() => {
    fetchIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, sortBy, order, page])

  const handleAdd = () => {
    setEditingIngredient(null)
    setIsModalOpen(true)
  }

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this ingredient?')) return
    try {
      await api.delete(`/ingredients/${id}`)
      fetchIngredients()
      showToast('Ingredient deleted', 'success')
    } catch (err) {
      console.error(err)
      showToast('Failed to delete ingredient', 'error')
    }
  }

  const handleSave = async (data: IngredientFormData) => {
    try {
      if (editingIngredient) {
        await api.put(`/ingredients/${editingIngredient.id}`, data)
      } else {
        await api.post('/ingredients/', data)
      }
      setIsModalOpen(false)
      fetchIngredients()
      showToast('Ingredient saved!', 'success')
    } catch (err) {
      console.error(err)
      showToast('Failed to save ingredient', 'error')
    }
  }

  if (loading) return <Skeleton />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Ingredients</h1>
        <button
          onClick={handleAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1) }}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">All categories</option>
          <option value="Baking">Baking</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1) }}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="name">Sort by name</option>
          <option value="price_per_unit">Sort by price</option>
        </select>
        <select
          value={order}
          onChange={(e) => { setOrder(e.target.value); setPage(1) }}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* List */}
      <div className="grid gap-3">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          >
            <div>
              <h3 className="font-bold text-gray-800">{ingredient.name}</h3>
              <p className="text-gray-500 text-sm">{ingredient.category}</p>
              <p className="text-orange-500 font-semibold">
                ${ingredient.price_per_unit} / {ingredient.unit}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(ingredient)} className="text-blue-500 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(ingredient.id)} className="text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {ingredients.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No ingredients match your search.</p>
      )}

      {/* Pagination */}
      <div className="flex gap-3 items-center justify-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-40"
        >
          ← Prev
        </button>
        <span className="text-gray-600">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded-lg disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IngredientForm
          key={editingIngredient?.id ?? 'new'}
          initialData={editingIngredient}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default IngredientList