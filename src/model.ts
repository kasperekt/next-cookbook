export type Ingredient = {
  id: number
  slug?: string
  name: string
}

export type Recipe = {
  id: number
  slug: string
  title: string
  ingredients: Ingredient[]
  steps: string[]
}
