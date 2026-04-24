const BASE_URL = "https://fresse-api.onrender.com/api";

// Login
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  return await res.json();
}

// Get Bowls
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

// Get Categories
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

// Get Base Ingredients
export async function getBaseIngredients() {
  try {
    const res = await fetch(`${BASE_URL}/baseingredients`);
    if (!res.ok) throw new Error("Failed to fetch base ingredients");
    return await res.json();
  } catch (error) {
    console.error("getBaseIngredients error:", error);
    return [];
  }
}

// Get Ingredients
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

// ⭐ Protected Prices (Task 5.4)
export async function getPrices(token: string) {
  try {
    const res = await fetch(`${BASE_URL}/prices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch prices");

    return await res.json();
  } catch (error) {
    console.error("getPrices error:", error);
    return [];
  }
}

// ⭐ NEW — Task 5.8: Save Recipe
export async function saveRecipe(token: string, recipeData: any) {
  try {
    const res = await fetch(`${BASE_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });

    if (!res.ok) throw new Error("Failed to save recipe");

    return await res.json();
  } catch (error) {
    console.error("saveRecipe error:", error);
    throw error;
  }
}