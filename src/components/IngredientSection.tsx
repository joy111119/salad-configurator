import type { Ingredient, Category } from "../types/salad";

type Props = {
  ingredients?: Ingredient[];
  categories?: Category[];
};

export default function IngredientSection({
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

            <div className="grid grid-cols-2 gap-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-2 bg-white text-black rounded shadow"
                >
                  {item.name} (€{item.price})
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
