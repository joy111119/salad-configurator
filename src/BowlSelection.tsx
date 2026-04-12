import { Bowl } from "../types/Bowl";
type Bowl = {
  id: number;
  name: string;
};

type Props = {
  bowls: Bowl[];
};

function BowlSelection({ bowls }: Props) {
  return (
    <div>
      <h2>Select a bowl</h2>

      {bowls.map((bowl) => (
        <button key={bowl.id}>
          {bowl.name}
        </button>
      ))}
    </div>
  );
}

export default BowlSelection;