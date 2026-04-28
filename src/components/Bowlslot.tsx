import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
};

function BowlSlot({ id }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: isOver ? "rgba(0, 200, 0, 0.2)" : "transparent",
        border: isOver ? "2px solid rgba(0, 200, 0, 0.7)" : "2px solid transparent",
      }}
    />
  );
}

export default BowlSlot;
