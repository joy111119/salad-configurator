import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import BaseSelection from "../components/BaseSelection";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import Modal from "../components/Modal";

import { useIngredientStore } from "../store/useIngredientStore";

import type { Bowl, Category, Ingredient } from "../types/index";
import {
  getBowls,
  getCategories,
  getIngredients,
  getBaseIngredients,
} from "../services/api";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [bases, setBases] = useState<Ingredient[]>([]);
  const [slots, setSlots] = useState<Record<string, Ingredient | null>>({});

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseType = useIngredientStore((s) => s.baseType);

  useEffect(() => {
    async function loadData() {
      try {
        const [b, c, i, bi] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
          getIngredients(),
          getBaseIngredients(),
        ]);

        setBowls(b);
        setCategories(c);
        setIngredients(i);
        setBases(bi);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [baseType]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const ingredient = ingredients.find(
      (i) => String(i.id) === String(active.id)
    );

    if (!ingredient) return;

    setSlots((prev) => ({
      ...prev,
      [over.id]: ingredient,
    }));
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 flex flex-col gap-6 text-white">

        <div className="flex flex-col lg:flex-row gap-6">
          <BowlSelection bowls={bowls} />
          <CenterBowl slots={slots} />

          {baseType === 2 ? (
            <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex items-center justify-center">
              No base options for quark
            </div>
          ) : (
            <BaseSelection ingredients={bases} />
          )}
        </div>

        <IngredientSection
          ingredients={ingredients}
          categories={categories}
        />

        <SummaryBar />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-black">Hello Modal</div>
        </Modal>
      </div>
    </DndContext>
  );
}

export default Configurator;