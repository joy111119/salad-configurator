import React, { useState } from "react";
import Modal from "./Modal";
import { useIngredientStore } from "../store/useIngredientStore";
import { saveRecipe } from "../services/api";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveRecipeModal: React.FC<SaveRecipeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const slots = useIngredientStore((s) => s.slots);
  const bowlId = useIngredientStore((s) => s.bowlId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save recipes");
      return;
    }

    const ingredientIds = Object.values(slots)
      .filter((i): i is NonNullable<typeof i> => i !== null)
      .map((i) => i.id);

    const recipeData = {
      name,
      bowlId,
      ingredientIds,
      is_public: isPublic,
    };

    try {
      await saveRecipe(token, recipeData);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save recipe");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Save Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipe Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded-md text-black"
              placeholder="My Awesome Salad"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Make Public</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SaveRecipeModal;