import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { calculateTotalWeight } from "../utils/calculations";

function SummaryBar() {
  const slots = useIngredientStore((s) => s.slots);
  const clearSlot = useIngredientStore((s) => s.clearSlot);

  const prices = usePriceStore((s) => s.prices);

  // Convert slots → array of { slotKey, ingredient }
  const activeItems = Object.entries(slots)
    .filter(([_, item]) => item !== null)
    .map(([slotKey, item]) => ({ slotKey, ingredient: item! }));

  // Total weight
  const totalWeight = calculateTotalWeight(
    activeItems.map((i) => i.ingredient)
  );

  // Total price
  const totalPrice = activeItems.reduce((sum, { ingredient }) => {
    const priceItem = prices.find((p) => p.item_id === ingredient.id);
    return sum + (priceItem ? priceItem.price : 0);
  }, 0);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

      {/* Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-4">
          Selected ingredients ({activeItems.length})
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          {activeItems.length === 0 ? (
            <li className="text-gray-500">No ingredients selected</li>
          ) : (
            activeItems.map(({ slotKey, ingredient }) => (
              <li
                key={slotKey}
                className="flex items-center justify-between"
              >
                <span>{ingredient.name}</span>

                <button
                  onClick={() => clearSlot(slotKey)}
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

        {/* Total Price */}
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