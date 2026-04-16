// Task 2.12 - Verified by TM116
import { useState } from "react";
import type { Ingredient, Category } from "../types/index";
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = ingredients.filter((i) => {
    if (i.categoryId === 6) return false;
    const matchesCategory = activeCategory === 'all' || i.categoryId === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>

      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded border border-gray-300 text-black"
      />

      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === 'all' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
        >
          All
        </button>
        {categories.filter(c => c.id !== 6).map((category) => (
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
