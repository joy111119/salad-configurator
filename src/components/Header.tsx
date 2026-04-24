import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/Fresse_logo.png"; // ← updated to match your file name

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const userName = useAuthStore((s) => s.userName);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-50 bg-zinc-800 text-white w-full flex justify-between items-center px-8 py-4 relative">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Fresse Logo"
          className="h-14 w-auto rounded-full shadow-md"
        />
        <span className="text-xl font-bold tracking-wide">FRESSE</span>
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-widest">
        BOWL-LASKURI
      </h1>

      {/* Hamburger Menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-col gap-1 cursor-pointer"
      >
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <nav className="absolute top-full right-8 mt-2 bg-[#A2D135] text-black rounded-2xl px-6 py-3 flex flex-col gap-2 shadow-md">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>Community</Link>
          <Link to="/print" onClick={() => setIsMenuOpen(false)}>Print</Link>

          {userName ? (
            <>
              <span className="font-medium">Hello, {userName}</span>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="text-left font-medium text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
              className="text-left font-medium"
            >
              Kirjaudu sisään
            </button>
          )}
        </nav>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}

export default Header;