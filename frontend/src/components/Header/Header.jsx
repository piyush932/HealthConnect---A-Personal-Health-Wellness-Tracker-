import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Features", href: "/" },
  { name: "Login", href: "/login" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <a href="/" className="text-2xl font-bold text-blue-600">HealthConnect</a>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {navLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-blue-500">{link.name}</a>
            </li>
          ))}
        </ul>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute left-0 top-[64px] z-40">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-lg font-medium text-blue-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
