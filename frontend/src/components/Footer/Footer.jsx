import React from "react";

const Footer = () => (
  <footer className="bg-blue-900 text-white pt-10 pb-6">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-4 md:px-8 space-y-8 md:space-y-0">
      <div>
        <h4 className="text-xl font-bold mb-2">HealthConnect</h4>
        <p className="text-gray-300 max-w-xs">
          Your personal health and wellness companion. Track, visualize, and improve your well-being.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul>
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/" className="hover:underline">About</a></li>
          <li><a href="/" className="hover:underline">Features</a></li>
          <li><a href="/" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Contact Us</h4>
        <p>Email: support@healthconnect.com</p>
        <div className="flex space-x-4 mt-2">
          <a href="#" aria-label="Facebook" className="hover:text-blue-400"><i className="fab fa-facebook"></i></a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-300"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-200"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 mt-8">
      <small>&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</small>
    </div>
  </footer>
);

export default Footer;
