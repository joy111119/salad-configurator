import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-800 text-white w-full flex justify-between items-center px-8 py-4">
      
      <Link to="/" className="w-20 h-20 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col bg-zinc-800 shadow-lg text-center">
        <span className="text-[10px]">Fresh Food Factory</span>
        <span className="text-sm font-bold">FRESSE</span>
      </Link>

      <h1 className="text-3xl font-black tracking-widest">
        BOWL-LASKURI
      </h1>

      <nav className="bg-[#A2D135] text-black rounded-2xl px-6 py-3 flex flex-col gap-2 shadow-md">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/community">Saved Recipes</Link>
        <Link to="/print">Print</Link>
      </nav>

    </header>
  )
}

export default Header
