import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle2, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Features", href: "/" },
];

const Header = ({ isAuthenticated, handleLoginToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    handleLoginToggle();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-md w-full z-50">
      {/* Top Navbar */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <button
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          className="text-2xl font-bold text-blue-600"
        >
          HealthConnect
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="hover:text-blue-500">
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center focus:outline-none"
                >
                  <UserCircle2 className="w-7 h-7 text-blue-600" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginToggle}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav (pushes content down) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner w-full">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
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
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-blue-600 hover:underline text-lg"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLoginToggle();
                    setMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
