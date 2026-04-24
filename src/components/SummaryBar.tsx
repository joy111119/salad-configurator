import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { calculateTotalWeight } from "../utils/calculations";

function SummaryBar() {
  const slots = useIngredientStore((s) => s.slots);
  const removeIngredient = useIngredientStore((s) => s.removeIngredient);

  const prices = usePriceStore((s) => s.prices);

  // Convert slots → array of active ingredients
  const activeIngredients = Object.values(slots).filter(
    (i): i is NonNullable<typeof i> => i !== null
  );

  // Total weight (already implemented)
  const totalWeight = calculateTotalWeight(activeIngredients);

  // ⭐ Task 5.6: Total price calculation using reduce()
  const totalPrice = activeIngredients.reduce((sum, ingredient) => {
    const priceItem = prices.find((p) => p.item_id === ingredient.id);
    return sum + (priceItem ? priceItem.price : 0);
  }, 0);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

      {/* Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-4">
          Selected ingredients ({activeIngredients.length})
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          {activeIngredients.length === 0 ? (
            <li className="text-gray-500">No ingredients selected</li>
          ) : (
            activeIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-center justify-between"
              >
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

      {/* Weight + Price + Print */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">

        {/* Total Weight */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {totalWeight} g
        </div>

        {/* ⭐ Total Price */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full shadow-md text-center">
          {totalPrice.toFixed(2)} €
        </div>

        {/* Print Button */}
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