const BASE_URL = "https://fresse-api.onrender.com/api";

// í´¹ Get Bowls
export async function getBowls() {
  try {
    const res = await fetch(`${BASE_URL}/bowls`);
    if (!res.ok) throw new Error("Failed to fetch bowls");
    return await res.json();
  } catch (error) {
    console.error("getBowls error:", error);
    return [];
  }
}

// í´¹ Get Categories
export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}

// í´¹ Get Ingredients
export async function getIngredients() {
  try {
    const res = await fetch(`${BASE_URL}/ingredients`);
    if (!res.ok) throw new Error("Failed to fetch ingredients");
    return await res.json();
  } catch (error) {
    console.error("getIngredients error:", error);
    return [];
  }
}
