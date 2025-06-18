import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Features", href: "/" },
];

const Header = ({ isAuthenticated, handleLoginToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    handleLoginToggle();
    setMenuOpen(false);
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/userprofile");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">HealthConnect</Link>

        <ul className="hidden md:flex space-x-8 font-medium items-center">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link to={link.href} className="hover:text-blue-500">{link.name}</Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleAuthClick}
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute left-0 top-[64px] z-40">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="block text-lg font-medium text-blue-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleAuthClick}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
