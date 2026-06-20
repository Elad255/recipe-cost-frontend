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
   pages: number
}

export interface IngredientFormData {
  name: string
  category: string
  unit: string
  price_per_unit: number
}


export interface RecipeIngredient {
  ingredient_id: number
  ingredient_name: string
  unit: string
  price_per_unit: number
  quantity: number
  cost: number
}

export interface Recipe {
  id: number
  name: string
  description: string | null
  category: string
  servings: number
  selling_price: number | null
  created_at: string
  updated_at: string
  owner_id: number
  ingredients: RecipeIngredient[]     
  total_cost: number
  cost_per_serving: number
  profit_margin: number | null
}

export interface RecipeListResponse {
  items: Recipe[]           
  total: number
  page: number
  size: number
  pages: number
}