import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

interface Props {
  className?: string;
}

function Navbar(props: Props) {

    const { className }= props;
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "News", path: "/news" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full bg-white z-50 shadow-sm",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Awww</span>some.
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                "text-base font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              )}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            className="ml-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-lg font-bold">
            <span className="text-blue-600">Awww</span>some.
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-start px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "text-lg font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              )}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 w-full text-center bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
