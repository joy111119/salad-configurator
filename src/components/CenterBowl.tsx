function CenterBowl() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      
      
      <div className="flex gap-3 mb-6 items-center">
        <button className="px-4 py-2 bg-green-100 rounded-full text-sm font-medium">
          Salaatti
        </button>
        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
          Rahka
        </button>
        <div className="flex gap-2">
          <span className="text-xl">🥗</span>
          <span className="text-xl">🍓</span>
        </div>
      </div>

      
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative">
        <span className="text-gray-400">Your Bowl</span>
      </div>

      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>100 g / 1,99 €</p>
        <p>500 ml</p>
      </div>

    </div>
  );
}

export default CenterBowl