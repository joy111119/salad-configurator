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

function SlotContent({ ingredient }: { ingredient: any }) {
  if (!ingredient) return <span className="text-[10px] text-gray-400">Drop</span>;
  return (
    <div className="flex flex-col items-center">
      {ingredient.image_url ? (
        <img
          src={ingredient.image_url}
          alt={ingredient.name}
          className="w-8 h-8 rounded-full object-cover border"
        />
      ) : (
        <span className="text-xs bg-green-200 px-2 py-1 rounded">
          {ingredient.name}
        </span>
      )}
    </div>
  );
}

function CenterBowl({ slots }: { slots: Record<string, any> }) {
  const baseType = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);
  const clearSelection = useIngredientStore((s) => s.clearSelection);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);

  const handleClear = () => {
    const confirmClear = window.confirm("Are you sure you want to empty the bowl?");
    if (confirmClear) clearSelection();
  };

  const slotCount = selectedBowl?.slot_count || 4;
  const isSquare = selectedBowl?.shape === "square";

  // Square bowl: 2-row grid layout
  const squarePositions = (count: number) => {
    const cols = Math.ceil(count / 2);
    return Array.from({ length: count }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const totalRows = Math.ceil(count / cols);
      return {
        x: ((col + 0.5) / cols) * 100,
        y: ((row + 0.5) / totalRows) * 100,
      };
    });
  };

  // Round bowl: circular layout
  const circlePositions = (count: number) =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      return {
        x: 50 + 30 * Math.cos(angle),
        y: 50 + 30 * Math.sin(angle),
      };
    });

  const positions = isSquare ? squarePositions(slotCount) : circlePositions(slotCount);

  return (
    <div className="flex-1 flex flex-col items-center mt-4 lg:mt-0">
      {/* Base type buttons */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            baseType === 1
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Salaatti
        </button>
        <button
          onClick={() => setBaseType(2)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            baseType === 2
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Rahka
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-4 text-xl">
        <button onClick={handleClear}>🗑️</button>
      </div>

      {/* Bowl — shape changes based on round vs square */}
      <div
        className={`w-80 h-80 border-[12px] border-gray-200 bg-gray-50 shadow-inner relative overflow-hidden ${
          isSquare ? "rounded-3xl" : "rounded-full"
        }`}
      >
        {/* Divider */}
        <BowlDivider slotCount={slotCount} />

        {/* Droppable slots */}
        {positions.map((pos, i) => {
          const slotId = `slot-${i}`;
          return (
            <div
              key={slotId}
              style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 40,
              }}
            >
              <BowlSlot id={slotId}>
                <SlotContent ingredient={slots[slotId]} />
              </BowlSlot>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          {selectedBowl
            ? `${selectedBowl.name} — ${selectedBowl.volume} ml`
            : "No bowl selected"}
        </p>
      </div>
    </div>
  );
}

export default CenterBowl;