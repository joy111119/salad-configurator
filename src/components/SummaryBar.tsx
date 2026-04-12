// Task 2.13 - Print route connected
import { Link } from "react-router-dom";

function SummaryBar() {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-4">Selected ingredients</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>Kana</li>
          <li>Kaksviset</li>
          <li>Kastikeet</li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6">

        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          450 g
        </div>

        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full shadow-md text-center">
          6,99 €
        </div>

        {/* Task 2.13: Print Route */}
        <Link to="/print">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md">
            Print
          </button>
        </Link>

      </div>

    </div>
  );
}

export default SummaryBar;