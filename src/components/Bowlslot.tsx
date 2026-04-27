import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  children?: React.ReactNode;
};

function BowlSlot({ id, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        border: "2px dashed #ccc",
        backgroundColor: isOver ? "rgba(0, 255, 0, 0.2)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.2s",
      }}
    >
      {children}
    </div>
  );
}

export default BowlSlot;