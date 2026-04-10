import type { Category, Ingredient } from "../types/salad"
import IngredientCard from "./IngredientCard"

interface Props {
  categories: Category[]
  ingredients: Ingredient[]
}

function IngredientSection({ categories, ingredients }: Props) {

  // Filter out category 6 (bases)
  const filteredCategories = categories.filter(c => c.id !== 6)

  // Filter out base ingredients
  const filteredIngredients = ingredients.filter(i => i.categoryId !== 6)

  return (
    <div className="bg-zinc-900 p-6 rounded-3xl shadow-lg">

      {/* Category filter buttons */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {filteredCategories.map(cat => (
          <button
            key={cat.id}
            className="px-4 py-2 bg-zinc-700 rounded-full text-white"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Ingredient grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIngredients.map(ing => (
          <IngredientCard key={ing.id} ingredient={ing} />
        ))}
      </div>

    </div>
  )
}

export default IngredientSection