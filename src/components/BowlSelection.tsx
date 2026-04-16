import type { Bowl } from "../types/index";
import { useIngredientStore } from '../store/useIngredientStore'

type Props = {
  bowls?: Bowl[];
};

export default function BowlSelection({ bowls = [] }: Props) {
  const setBowl = useIngredientStore((s) => s.setBowl)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)

  return (
    <div className="p-4 border rounded w-full lg:w-1/3">
      <h2 className="text-xl font-bold mb-4">Select Bowl</h2>

      <div className="flex flex-col gap-2">
        {bowls.map((bowl) => (
          <button
            key={bowl.id}
            onClick={() => setBowl(bowl)}
            className={`p-3 rounded shadow w-full text-left text-black ${selectedBowl?.id === bowl.id ? 'bg-green-200' : 'bg-white'}`}
          >
            {bowl.name}
          </button>
        ))}
      </div>
    </div>
  );
}
