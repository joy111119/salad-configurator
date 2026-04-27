import { useDroppable } from "@dnd-kit/core";

export function BowlSector({ id }: { id: string }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background: isOver ? "rgba(0,255,0,0.2)" : "transparent",
      }}
    />
  );
}