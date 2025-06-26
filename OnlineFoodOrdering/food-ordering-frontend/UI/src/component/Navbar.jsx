import { assests } from "../assets/assets";
import { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi"; // Cart Icon
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { token , setToken , setFoodQuantity} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setFoodQuantity({})
        setToken('')
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo and Nav Links */}
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={assests.logo} className="h-8 rounded" alt="Food Logo" />
                    </Link>
                    {/* Nav Links */}
                    <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700 dark:text-white">
                        <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                        <li><Link to="/explore" className="hover:text-blue-600 dark:hover:text-blue-400">Explore</Link></li>
                        <li><Link to="/contact-us" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Right Section - Cart, Login, Register */}
                <div className="flex items-center space-x-3 md:space-x-4">
                    {/* Hamburger (Mobile) */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="text-gray-800 dark:text-white hover:text-blue-600 text-xl">
                        <FiShoppingCart />
                    </Link>
{
  !token ? (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Register
      </Link>
    </div>
  ) : (
    <div className="relative group">
      <img
        src={assests.profile}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition duration-200 z-10">
        <li
          onClick={() => navigate('/myorders')}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          Orders
        </li>
        <li
          onClick={() => logout()}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          Logout
        </li>
      </ul>
    </div>
  )
}



                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col space-y-2 text-gray-700 dark:text-white font-medium">
                        <li><Link to="/" className="block py-2 hover:text-blue-600">Home</Link></li>
                        <li><Link to="/explore" className="block py-2 hover:text-blue-600">Explore</Link></li>
                        <li><Link to="/contact-us" className="block py-2 hover:text-blue-600">Contact Us</Link></li>
                        <li className="flex items-center gap-2 py-2">
                            <FiShoppingCart />
                            <Link to="/cart" className="hover:text-blue-600">Cart</Link>
                        </li>
                        <li>
                            <Link to="/login" className="block py-2 px-4 w-fit bg-gray-700 text-white rounded hover:bg-gray-800">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="block py-2 px-4 w-fit bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
