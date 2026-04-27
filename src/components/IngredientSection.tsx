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
  const [activeCategory, setActiveCategory] = useState<string | number>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIngredients = ingredients.filter((i) => {
    if (!i) return false;
    if (i.categoryId === 6) return false;
    const matchesCategory =
      activeCategory === "all" || i.categoryId === activeCategory;

    const matchesSearch =
      i.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded border border-gray-300 text-black"
      />

      {/* 🏷️ Category Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            activeCategory === "all"
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          All
        </button>

        {categories
          .filter((c) => c.id !== 6)
          .map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                activeCategory === category.id
                  ? "bg-green-400 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
      </div>

      {/* 🧩 Draggable Ingredients */}
      {filteredIngredients.length === 0 ? (
        <p className="text-gray-400 text-sm">No ingredients found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredIngredients.map((item) => (
            <IngredientCard key={item.id} ingredient={item} />
          ))}
        </div>
      )}

      {/* 📘 Dietary Legend */}
      <div className="mt-6 text-sm text-gray-400 flex gap-6 flex-wrap">
        <span>
          <strong className="text-green-400">G</strong> = Gluten-free
        </span>
        <span>
          <strong className="text-green-400">L</strong> = Lactose-free
        </span>
        <span>
          <strong className="text-green-400">V</strong> = Vegan
        </span>
      </div>
    </div>
  );
}

export default IngredientSection;