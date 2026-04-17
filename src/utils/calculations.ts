export function calculateTotalWeight(ingredients) {
  return ingredients.reduce(
    (sum, ingredient) => sum + (ingredient?.weight_grams || 0),
    0
  );
}