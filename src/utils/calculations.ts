type Ingredient = {
  weight_grams?: number;
};

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce(
    (sum: number, ingredient: Ingredient) =>
      sum + (ingredient?.weight_grams || 0),
    0
  );
}