function IngredientSection() {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">
        3. Lisää raaka-aineet
      </h2>

      
      <div className="flex flex-wrap items-center gap-4 mb-6">
        
        
        <input
          type="text"
          placeholder="Hae raaka-aineita..."
          className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
        />

        
        <div className="flex gap-3">
          <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
            Kana
          </button>
          <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
            Kasvikset
          </button>
          <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
            Kastikkeet
          </button>
        </div>

      </div>

      
      <div className="text-zinc-400">
        Ingredients will go here...
      </div>

    </div>
  );
}

export default IngredientSection