import { useIngredientStore } from "../store/useIngredientStore";
import BowlSlot from "./Bowlslot";

const CX = 50, CY = 50, R = 50;

function wedgePath(index: number, total: number): string {
  const start = (index / total) * 2 * Math.PI - Math.PI / 2;
  const end = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
  const x1 = (CX + R * Math.cos(start)).toFixed(3);
  const y1 = (CY + R * Math.sin(start)).toFixed(3);
  const x2 = (CX + R * Math.cos(end)).toFixed(3);
  const y2 = (CY + R * Math.sin(end)).toFixed(3);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
}

function circlePositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    // Use midpoint of each wedge so drop zone aligns with the dashed ring marker
    const angle = ((i + 0.5) / count) * 2 * Math.PI - Math.PI / 2;
    return { x: 50 + 30 * Math.cos(angle), y: 50 + 30 * Math.sin(angle) };
  });
}

function squarePositions(count: number) {
  const cols = Math.ceil(count / 2);
  const totalRows = Math.ceil(count / cols);
  return Array.from({ length: count }, (_, i) => ({
    x: ((i % cols + 0.5) / cols) * 100,
    y: ((Math.floor(i / cols) + 0.5) / totalRows) * 100,
  }));
}

function CenterBowl({ slots: slotsProp }: { slots?: Record<string, any> }) {
  const storeSlots = useIngredientStore((s) => s.slots);
  const slots = slotsProp ?? storeSlots;
  const baseType = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);
  const clearSelection = useIngredientStore((s) => s.clearSelection);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);
  const selectedBase = useIngredientStore((s) => s.selectedBase);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to empty the bowl?")) clearSelection();
  };

  const slotCount = selectedBowl?.slot_count || 4;
  const isSquare = selectedBowl?.shape === "square";
  const positions = isSquare ? squarePositions(slotCount) : circlePositions(slotCount);

  return (
    <div className="flex-1 flex flex-col items-center mt-4 lg:mt-0">
      {/* Base type buttons */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            baseType === 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Salaatti
        </button>
        <button
          onClick={() => setBaseType(2)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            baseType === 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Rahka
        </button>
      </div>

      <div className="flex gap-4 mb-4 text-xl">
        <button onClick={handleClear} title="Clear bowl">🗑️</button>
      </div>

      {/* Bowl */}
      <div
        className={`w-80 h-80 relative overflow-hidden shadow-lg ${
          isSquare
            ? "rounded-3xl border-[14px] border-[#c8a97a] bg-[#f5f0e8]"
            : "rounded-full border-[14px] border-[#c8a97a] bg-[#f5f0e8]"
        }`}
      >
        {/* ── ROUND BOWL: SVG wedge visualization ── */}
        {!isSquare && (
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 10 }}
          >
            <defs>
              <clipPath id="bowl-circle-clip">
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
              {Array.from({ length: slotCount }, (_, i) => (
                <clipPath key={i} id={`wedge-clip-${i}`}>
                  <path d={wedgePath(i, slotCount)} />
                </clipPath>
              ))}
            </defs>

            {/* Bowl inner fill */}
            <circle cx={CX} cy={CY} r={R} fill="#f0ebe0" />

            {/* Base image fills the entire bowl */}
            {selectedBase?.image_url && (
              <image
                href={selectedBase.image_url}
                x="0" y="0" width="100" height="100"
                clipPath="url(#bowl-circle-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* Ingredient image per wedge segment */}
            {Array.from({ length: slotCount }, (_, i) => {
              const ingredient = slots[`slot-${i}`];
              if (!ingredient?.image_url) return null;
              return (
                <image
                  key={i}
                  href={ingredient.image_url}
                  x="0" y="0" width="100" height="100"
                  clipPath={`url(#wedge-clip-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              );
            })}

            {/* Dashed ring marker for empty slots */}
            {Array.from({ length: slotCount }, (_, i) => {
              if (slots[`slot-${i}`]) return null;
              const mid = ((i + 0.5) / slotCount) * 2 * Math.PI - Math.PI / 2;
              return (
                <circle
                  key={i}
                  cx={(CX + 30 * Math.cos(mid)).toFixed(2)}
                  cy={(CY + 30 * Math.sin(mid)).toFixed(2)}
                  r="7"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
              );
            })}

            {/* Divider lines from center to edge */}
            {Array.from({ length: slotCount }, (_, i) => {
              const angle = (i / slotCount) * 2 * Math.PI - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1={CX} y1={CY}
                  x2={(CX + R * Math.cos(angle)).toFixed(3)}
                  y2={(CY + R * Math.sin(angle)).toFixed(3)}
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
              );
            })}
          </svg>
        )}

        {/* ── SQUARE BOWL: base + ingredient images filling each grid cell ── */}
        {isSquare && (() => {
          const cols = Math.ceil(slotCount / 2);
          const totalRows = Math.ceil(slotCount / cols);
          const cellW = 100 / cols;
          const cellH = 100 / totalRows;
          return (
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10, pointerEvents: "none" }}
            >
              {/* Base image fills entire bowl */}
              {selectedBase?.image_url && (
                <image
                  href={selectedBase.image_url}
                  x="0" y="0" width="100" height="100"
                  preserveAspectRatio="xMidYMid slice"
                />
              )}

              {/* Each ingredient fills its grid cell */}
              {Array.from({ length: slotCount }, (_, i) => {
                const ingredient = slots[`slot-${i}`];
                if (!ingredient?.image_url) return null;
                const col = i % cols;
                const row = Math.floor(i / cols);
                return (
                  <image
                    key={i}
                    href={ingredient.image_url}
                    x={(col * cellW).toFixed(2)}
                    y={(row * cellH).toFixed(2)}
                    width={cellW.toFixed(2)}
                    height={cellH.toFixed(2)}
                    preserveAspectRatio="xMidYMid slice"
                  />
                );
              })}

              {/* Grid divider lines */}
              {Array.from({ length: cols - 1 }, (_, c) => (
                <line
                  key={`v${c}`}
                  x1={((c + 1) * cellW).toFixed(2)} y1="0"
                  x2={((c + 1) * cellW).toFixed(2)} y2="100"
                  stroke="white" strokeWidth="1.5" strokeOpacity="0.75"
                />
              ))}
              {Array.from({ length: totalRows - 1 }, (_, r) => (
                <line
                  key={`h${r}`}
                  x1="0" y1={((r + 1) * cellH).toFixed(2)}
                  x2="100" y2={((r + 1) * cellH).toFixed(2)}
                  stroke="white" strokeWidth="1.5" strokeOpacity="0.75"
                />
              ))}
            </svg>
          );
        })()}

        {/* Drop zones — transparent, on top of SVG, for drag-and-drop */}
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
              <BowlSlot id={slotId} />
            </div>
          );
        })}
      </div>

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
