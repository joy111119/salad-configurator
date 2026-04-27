import { useIngredientStore } from "../store/useIngredientStore";
import BowlSlot from "./Bowlslot"; // ✅ FIXED casing

function BowlDivider({ slotCount }: { slotCount: number }) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const cx = 50;
  const cy = 50;
  const r = 50;
  const lineCount = slotCount / 2;

  for (let i = 0; i < lineCount; i++) {
    const angle = (i * Math.PI) / lineCount;
    lines.push({
      x1: cx + r * Math.cos(angle),
      y1: cy + r * Math.sin(angle),
      x2: cx - r * Math.cos(angle),
      y2: cy - r * Math.sin(angle),
    });
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
      ))}
    </svg>
  );
}

function CenterBowl({ slots }: { slots: Record<string, any> }) {
  const baseType = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);
  const clearSelection = useIngredientStore((s) => s.clearSelection);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to empty the bowl?"
    );
    if (confirmClear) clearSelection();
  };

  const slotCount = selectedBowl?.slot_count || 4;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      {/* Base type buttons */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-4 py-2 rounded-full text-sm ${
            baseType === 1 ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          Salaatti
        </button>
        <button
          onClick={() => setBaseType(2)}
          className={`px-4 py-2 rounded-full text-sm ${
            baseType === 2 ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          Rahka
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-4 text-xl">
        <button onClick={handleClear}>🗑️</button>
      </div>

      {/* Bowl */}
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 shadow-inner relative overflow-hidden">

        {/* Divider */}
        <BowlDivider slotCount={slotCount} />

        {/* 🔥 DROPPABLE SLOTS */}
        {[...Array(slotCount)].map((_, i) => {
          const angle = (i / slotCount) * 2 * Math.PI;
          const x = 50 + 35 * Math.cos(angle);
          const y = 50 + 35 * Math.sin(angle);

          const slotId = `slot-${i}`;
          const ingredient = slots[slotId]; // ✅ cleaner

          return (
            <div
              key={slotId}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 40,
              }}
            >
              <BowlSlot id={slotId}>
                {ingredient ? (
                  <div className="flex flex-col items-center">
                    {ingredient.image_url ? (
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <span className="text-xs bg-green-200 px-2 py-1 rounded">
                        {ingredient.name}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400">Drop</span>
                )}
              </BowlSlot>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>{selectedBowl ? selectedBowl.volume : 0} ml</p>
      </div>
    </div>
  );
}

export default CenterBowl;