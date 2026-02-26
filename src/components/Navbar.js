function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Omsai Medical Store</h1>
        <div className="space-x-6 hidden md:block">
          <a href="#about" className="hover:text-accent">About</a>
          <a href="#medicines" className="hover:text-accent">Medicines</a>
          <a href="#contact" className="hover:text-accent">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;