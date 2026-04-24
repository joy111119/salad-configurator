import React from "react";
import type { Ingredient } from "../types/index";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";

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

  // ⭐ Read prices from global store
  const prices = usePriceStore((state) => state.prices);

  // ⭐ Find matching price for this ingredient
  const priceItem = prices.find((p) => p.item_id === ingredient.id);

  // ⭐ Detect login
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  return (
    <div style={styles.card} onClick={() => addIngredient(ingredient)}>
      <div style={styles.name}>{ingredient.name}</div>

      {/* ⭐ Dynamic price display */}
      <div style={{ fontSize: "12px", marginTop: "4px", color: "#333" }}>
        {isLoggedIn ? (
          priceItem ? (
            <span style={{ color: "green", fontWeight: "bold" }}>
              + {priceItem.price.toFixed(2)} €
            </span>
          ) : (
            <span style={{ color: "#888" }}>No price available</span>
          )
        ) : (
          <span style={{ color: "#888" }}>Login to see price</span>
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
  card: {
    width: "140px",
    height: "160px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "14px",
    color: "#000000",
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