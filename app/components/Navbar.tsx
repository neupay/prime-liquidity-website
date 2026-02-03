export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="flex items-center font-bold text-lg text-gray-900">
          <img src="/images/prime-logo.png" alt="Prime Liquidity Logo" className="h-12 w-auto mr-2" />
          {/* <span>Prime Liquidity</span> */}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700">
            <a href="#problem" className="hover:text-black transition">
                Problem
            </a>
            <a href="#solution" className="hover:text-black transition">
                Solution
            </a>
            <a href="#how-it-works" className="hover:text-black transition">
                How it works
            </a>
            <a href="#repayment" className="hover:text-black transition">
                Repayment
            </a>
            <a href="#contact" className="hover:text-black transition">
                Partner
            </a>
        </div>

      </nav>
    </header>
  );
}
