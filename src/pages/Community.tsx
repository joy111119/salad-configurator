import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";

const BASE_URL = "https://fresse-api.onrender.com/api";

type Recipe = {
  id: number;
  name: string;
  description?: string;
  ingredients: any[]; 
};

function Community() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecipe = useIngredientStore((s) => s.loadRecipe);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`${BASE_URL}/recipes`);

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const handleLoad = (recipe: Recipe) => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      alert("This recipe has no ingredients");
      return;
    }

    
    loadRecipe(recipe.ingredients);

    
    navigate("/");
  };

  if (loading) {
    return (
      <div className="p-10 text-white bg-zinc-900 min-h-screen">
        Loading recipes...
      </div>
    );
  }

  return (
    <div className="p-10 pt-6 text-white bg-zinc-900 min-h-[calc(100vh-120px)]">
      <h1 className="text-3xl font-bold mb-6">Community Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-zinc-800 rounded-xl p-4 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="h-32 bg-gray-300 flex items-center justify-center mb-3 rounded">
                  No Image
                </div>

                <h2 className="text-lg font-semibold">{recipe.name}</h2>

                <p className="text-sm text-gray-400">
                  {recipe.description || "No description available"}
                </p>
              </div>

              <button
                onClick={() => handleLoad(recipe)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
              >
                Load to Bowl
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Community;