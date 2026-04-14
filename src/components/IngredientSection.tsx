// Task 2.12 - Verified by TM116
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
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>

      {categories.map((category) => {
        const filtered = ingredients.filter(
          (i) => i.categoryId === category.id
        );

        return (
          <div key={category.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {category.name}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <IngredientCard
                  key={item.id}
                  ingredient={item}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default IngredientSection;