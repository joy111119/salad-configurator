import { describe, it, expect } from "vitest";
import { calculateTotalWeight } from "./calculations";

describe("calculateTotalWeight", () => {
  it("returns the correct total weight", () => {
    const mockIngredients = [
      { id: 1, name: "A", weight_grams: 50, price: 1, categoryId: 1 },
      { id: 2, name: "B", weight_grams: 100, price: 2, categoryId: 1 },
    ];

    const result = calculateTotalWeight(mockIngredients);

    expect(result).toBe(150);
  });
});