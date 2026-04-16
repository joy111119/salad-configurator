import type { Ingredient } from "../types/index"

interface Props {
  ingredients: Ingredient[]
}

function BaseSelection({ ingredients }: Props) {

  // Filter only base ingredients (categoryId === 6)
  const bases = ingredients.filter(i => i.categoryId === 6)

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      <h2 className="text-lg font-semibold mb-4 text-center">
        Valitse salaattipohja
      </h2>

      <div className="w-full space-y-3">
        {bases.map(base => (
          <div 
            key={base.id}
            className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center"
          >
            <span className="text-gray-300">{base.name}</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default BaseSelection