function BaseSelection() {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      {/* Step Number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4 text-center">
        Valitse salaattipohja
      </h2>

      {/* Placeholder rows */}
      <div className="w-full space-y-3">
        
        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="text-gray-400">Base option 1</span>
        </div>

        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="text-gray-400">Base option 2</span>
        </div>

        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="text-gray-400">Base option 3</span>
        </div>

      </div>
    </div>
  );
}
export default BaseSelection