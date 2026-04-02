import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-zinc-800 text-white w-full flex justify-between items-center px-8 py-4">
      
      {/* Logo */}
      <Link to="/" className="w-20 h-20 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col bg-zinc-800 shadow-lg text-center">
        <span className="text-[10px]">Fresh Food Factory</span>
        <span className="text-sm font-bold">FRESSE</span>
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-widest">
        BOWL-LASKURI
      </h1>

      {/* Menu */}
      <nav className="bg-[#A2D135] text-black rounded-2xl px-6 py-3 flex flex-col gap-2 shadow-md">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/community" className="hover:underline">Community</Link>
        <Link to="/print" className="hover:underline">Print</Link>
      </nav>

    </header>
  )
}

export default Header
