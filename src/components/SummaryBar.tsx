import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";

function SummaryBar() {
  const slots = useIngredientStore((s) => s.slots);
  const removeIngredient = useIngredientStore((s) => s.removeIngredient);

  // Get active ingredients (already correct)
  const activeIngredients = Object.values(slots).filter((i) => i !== null);

  // ✅ Task 4.10: Calculate total weight using reduce
  const totalWeight = activeIngredients.reduce(
    (sum, ingredient) => sum + (ingredient?.weight_grams || 0),
    0
  );

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-4">
          Selected ingredients ({activeIngredients.length})
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          {activeIngredients.length === 0 ? (
            <li className="text-gray-500">No ingredients selected</li>
          ) : (
            activeIngredients.map((ingredient, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{ingredient.name}</span>
                <button
                  onClick={() => removeIngredient(String(ingredient.id))}
                  className="ml-4 text-red-400 hover:text-red-600 font-bold text-xs"
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6">

        {/* ✅ Dynamic weight instead of hardcoded value */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {totalWeight} g
        </div>

        {/* (Still hardcoded - likely next task) */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full shadow-md text-center">
          6,99 €
        </div>

        <Link to="/print">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md">
            Print
          </button>
        </Link>

      </div>

    </div>
  );
}

export default SummaryBar;