import type { Bowl } from "../types/salad";

type Props = {
  bowls?: Bowl[];
};

export default function BowlSelection({ bowls = [] }: Props) {
  return (
    <div className="p-4 border rounded w-full lg:w-1/3">
      <h2 className="text-xl font-bold mb-4">Select Bowl</h2>

      <div className="flex flex-col gap-2">
        {bowls.map((bowl) => (
          <div
            key={bowl.id}
            className="p-3 bg-white text-black rounded shadow"
          >
            {bowl.name}
          </div>
        ))}
      </div>
    </div>
  );
}
