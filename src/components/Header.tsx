import { Link } from 'react-router-dom'
import { useState } from 'react'
import LoginModal from './LoginModal'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-zinc-800 text-white w-full flex justify-between items-center px-8 py-4 relative">
      
      <Link to="/" className="w-20 h-20 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col bg-zinc-800 shadow-lg text-center">
        <span className="text-[10px]">Fresh Food Factory</span>
        <span className="text-sm font-bold">FRESSE</span>
      </Link>

      <h1 className="text-3xl font-black tracking-widest">
        BOWL-LASKURI
      </h1>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-col gap-1 cursor-pointer"
      >
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
      </button>

      {isMenuOpen && (
        <nav className="absolute top-full right-8 mt-2 bg-[#A2D135] text-black rounded-2xl px-6 py-3 flex flex-col gap-2 shadow-md">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>Saved Recipes</Link>
          <Link to="/print" onClick={() => setIsMenuOpen(false)}>Print</Link>
          <button
            onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
            className="text-left font-medium"
          >
            Kirjaudu sisään
          </button>
        </nav>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

    </header>
  )
}

export default Header