export interface Ingredient {
  id: number           
  name:string
  category: string
  unit: string
  price_per_unit:number
  created_at: string      
  updated_at: string
  owner_id: number
}

// the paginated wrapper your GET /ingredients/ returns
export interface IngredientListResponse {
  items: Ingredient[]        
  total: number
  page: number
  size: number
}