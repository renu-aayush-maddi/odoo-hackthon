import React from "react";
import { Link } from "react-router-dom";
import { FaTelegram, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="text-lg">© 2025 Bharat Coin Bazaar. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
          <Link to="https://renuaayush-portfolio.netlify.app/" className="hover:text-yellow-400">
            About
          </Link>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://telegram.org" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
            <FaTelegram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/renu-aayush-maddi/" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com/renu_aayush_14_02/" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
