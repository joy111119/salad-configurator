import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";

function Print() {
  const slots = useIngredientStore((s) => s.slots);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);
  const selectedBase = useIngredientStore((s) => s.selectedBase);
  const prices = usePriceStore((s) => s.prices);

  const ingredients = Object.values(slots).filter(
    (item) => item && typeof item === "object"
  ) as any[];

  const allItems = [
    ...(selectedBase ? [selectedBase] : []),
    ...ingredients,
  ];

  const getPrice = (item: any) => {
    const priceItem = prices.find((p) => p.item_id === item.id);
    return priceItem ? priceItem.price : (item.price ?? null);
  };

  const totalPrice = allItems.reduce((sum, item) => {
    const p = getPrice(item);
    return sum + (p ?? 0);
  }, 0);

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

        <ul className="text-sm space-y-2">
          {allItems.length === 0 ? (
            <li>No ingredients selected</li>
          ) : (
            allItems.map((item: any, index) => {
              const price = getPrice(item);
              return (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-gray-600">
                    {price != null ? `${price.toFixed(2)} €` : "-"}
                  </span>
                </li>
              );
            })
          )}
        </ul>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-sm">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <hr className="my-4" />

        <p className="text-center text-xs text-gray-500">
          Thank you for your order!
        </p>
      </div>
    </div>
  );
}

export default Print;
