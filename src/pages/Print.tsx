import { useIngredientStore } from "../store/useIngredientStore";

function Print() {
  const slots = useIngredientStore((s) => s.slots);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);

  const ingredients = Object.values(slots).filter(
    (item) => item && typeof item === "object"
  );

  return (
    <div className="p-6 text-black bg-white min-h-screen print-area">

      <div className="no-print mb-6">
        <button
          onClick={() => window.print()}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          🖨️ Print Receipt
        </button>
      </div>

  
      <div className="max-w-md mx-auto border p-6 rounded shadow">
        <h1 className="text-xl font-bold text-center mb-4">
          🥗 Bowl Receipt
        </h1>

        <div className="text-sm mb-4 text-center">
          <p>{selectedBowl?.volume || 0} ml bowl</p>
        </div>

        <hr className="my-4" />

        <h2 className="font-semibold mb-2">Ingredients</h2>

        <ul className="text-sm space-y-1">
          {ingredients.length === 0 ? (
            <li>No ingredients selected</li>
          ) : (
            ingredients.map((item: any, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
              </li>
            ))
          )}
        </ul>

        <hr className="my-4" />

        <p className="text-center text-xs text-gray-500">
          Thank you for your order!
        </p>
      </div>
    </div>
  );
}

export default Print;