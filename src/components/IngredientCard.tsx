import React from "react";
import type { Ingredient } from "../types/index";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore, type Price } from "../store/usePriceStore";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  ingredient: Ingredient;
}

const dietLabels: Record<string, string> = {
  G: "Gluten Free",
  L: "Lactose Free",
  V: "Vegan",
};

const IngredientCard: React.FC<Props> = ({ ingredient }) => {
  const addIngredient = useIngredientStore((s) => s.addIngredient);

  const prices = usePriceStore((state: { prices: Price[] }) => state.prices);
  const priceItem = prices.find((p: Price) => p.item_id === ingredient.id);

  // ✅ DRAG ENABLED AGAIN
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ingredient.id.toString(),
      data: ingredient, // 🔥 critical
    });

  const dragStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...styles.card, ...dragStyle }}
      onClick={() => {
        if (!isDragging) addIngredient(ingredient);
      }}
    >
      {ingredient.image_url && (
        <img
          src={ingredient.image_url}
          alt={ingredient.name}
          style={styles.image}
          draggable={false}
        />
      )}

      <div style={styles.name}>{ingredient.name}</div>

      <div style={{ fontSize: "12px", marginTop: "4px" }}>
        {priceItem ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            + {priceItem.price.toFixed(2)} €
          </span>
        ) : ingredient.price != null ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            + {ingredient.price.toFixed(2)} €
          </span>
        ) : (
          <span style={{ color: "#888" }}>No price available</span>
        )}
      </div>

      <div style={styles.diets}>
        {ingredient.diets?.map((diet) => (
          <span key={diet} style={styles.tag}>
            {dietLabels[diet] || diet}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientCard;

const styles: { [key: string]: React.CSSProperties } = {
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover" as const,
    borderRadius: "8px",
  },
  card: {
    width: "140px",
    height: "180px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    color: "#333",
  },
  name: {
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center",
    color: "#333",
  },
  diets: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    fontSize: "10px",
    padding: "3px 6px",
    backgroundColor: "#f0f0f0",
    borderRadius: "6px",
  },
};