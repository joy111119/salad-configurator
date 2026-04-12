import React from "react";
import type { Ingredient } from "../types/salad";

interface Props {
  ingredient: Ingredient;
}

const dietLabels: Record<string, string> = {
  G: "Gluten Free",
  L: "Lactose Free",
  V: "Vegan",
};

const IngredientCard: React.FC<Props> = ({ ingredient }) => {
  return (
    <div style={styles.card}>
      <div style={styles.name}>{ingredient.name}</div>

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
    height: "140px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "14px",
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