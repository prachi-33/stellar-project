import { Link } from "react-router-dom";
import WalletButton from "./wallet";

export default function Navbar() {
  return (
    <nav className="w-full h-24 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <span className="text-white text-2xl">🏢</span>
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-wide">PropChain</h1>
          <p className="text-sm text-gray-400">Blockchain Real Estate</p>
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center gap-6">
        <Link to="/about">
          <button className="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
            About Us
          </button>
        </Link>
        <Link to="/new">
          <button className="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
            List Property
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
            My NFTs
          </button>
        </Link>

        <WalletButton />
      </div>
    </nav>
  );
}

