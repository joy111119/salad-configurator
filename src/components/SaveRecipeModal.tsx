import React, { useState } from "react";
import Modal from "./Modal";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, isPublic: boolean) => void;
}

const SaveRecipeModal: React.FC<SaveRecipeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, isPublic);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Save Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Recipe Name */}
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

          {/* Public Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Make Public</label>
          </div>

          {/* Buttons */}
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