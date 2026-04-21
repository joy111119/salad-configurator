import { useIngredientStore } from '../store/useIngredientStore'

function CenterBowl() {
  const baseType = useIngredientStore((s) => s.baseType)
  const setBaseType = useIngredientStore((s) => s.setBaseType)
  const slots = useIngredientStore((s) => s.slots)
  const clearSelection = useIngredientStore((s) => s.clearSelection)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)

  const activeIngredients = Object.values(slots).filter((i) => i !== null)

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to empty the bowl?"
    )

    if (confirmClear) {
      clearSelection()
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">

      
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${baseType === 1 ? 'bg-green-100' : 'bg-gray-100'}`}
        >
          Salaatti
        </button>
        <button
          onClick={() => setBaseType(2)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${baseType === 2 ? 'bg-green-100' : 'bg-gray-100'}`}
        >
          Rahka
        </button>
        <div className="flex gap-2">
          <span className="text-xl">🥗</span>
          <span className="text-xl">🍓</span>
        </div>
      </div>

      
      <div className="flex gap-4 mb-4 text-xl">
        <button onClick={() => alert("Feature coming soon!")}>
          ↩️
        </button>

        <button onClick={handleClear}>
          🗑️
        </button>

        <button onClick={() => alert("Feature coming soon!")}>
          💾
        </button>
      </div>

      
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-wrap items-center justify-center gap-2 p-6 shadow-inner relative overflow-hidden">
        {activeIngredients.length === 0 ? (
          <span className="text-gray-400">Your Bowl</span>
        ) : (
          activeIngredients.map((ingredient, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium"
            >
              {ingredient!.name}
            </span>
          ))
        )}
      </div>

      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>100 g / 1,99 €</p>
        <p>{selectedBowl ? selectedBowl.volume : 0} ml</p>
      </div>

    </div>
  );
}

export default CenterBowl;