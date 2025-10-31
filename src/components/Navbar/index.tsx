import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full bg-white shadow-sm z-50",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold"
        >
          <span className="text-indigo-600">Focus</span>
          <span className="text-gray-800">flow.</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                "text-base font-medium transition-colors duration-200 border-b-2 pb-1",
                location.pathname === link.path
                  ? "text-indigo-600 border-indigo-600 font-semibold"
                  : "text-gray-700 border-transparent hover:text-indigo-500"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 px-5 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition-all"
          >
            Contact
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl text-gray-700"
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-xl font-bold">
            <span className="text-indigo-600">Awww</span>
            <span className="text-gray-800">some.</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-start px-6 py-6 space-y-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "text-lg font-medium w-full py-1 border-b-2 transition-all duration-200",
                location.pathname === link.path
                  ? "text-indigo-600 border-indigo-600 font-semibold"
                  : "text-gray-700 border-transparent hover:text-indigo-500"
              )}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center px-5 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
