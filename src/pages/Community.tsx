import { useEffect, useState } from "react";
import { getRecipes } from "../services/api"; // adjust path if needed

type Recipe = {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  created_by?: string;
};

function Community() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err: any) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return <div className="p-4">Loading recipes...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 font-semibold">
        ⚠ {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Community Recipes</h2>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              {/* Image */}
              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>

                <p className="text-sm text-gray-600 mt-1">
                  {recipe.description || "No description available"}
                </p>

                {recipe.created_by && (
                  <p className="text-xs text-gray-400 mt-2">
                    By {recipe.created_by}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Community;