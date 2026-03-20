function Header() {
  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
      <a
        href="/"
        className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg text-center"
      >
        <span className="text-[10px] leading-tight">Fresh Food Factory</span>
        <span className="text-sm font-bold tracking-wide">FRESSE</span>
      </a>

      <h1 className="text-3xl font-black tracking-widest mt-6">BOWL-LASKURI</h1>

      <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
        <span className="font-semibold">Menu</span>
        <span>Home</span>
        <span>About</span>
      </div>
    </header>
  )
}

export default Header