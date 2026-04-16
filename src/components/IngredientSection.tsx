// Task 2.12 - Verified by TM116
import { useState } from "react";
import type { Ingredient, Category } from "../types/salad";
import IngredientCard from "./IngredientCard";

type Props = {
  ingredients?: Ingredient[];
  categories?: Category[];
};

function IngredientSection({
  ingredients = [],
  categories = [],
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | number>('all');

  const filteredIngredients = activeCategory === 'all'
    ? ingredients
    : ingredients.filter((i) => i.categoryId === activeCategory);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>

      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === 'all' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === category.id ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredIngredients.map((item) => (
          <IngredientCard
            key={item.id}
            ingredient={item}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientSection;
