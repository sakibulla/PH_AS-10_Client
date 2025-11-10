import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        
        <div>
          <h6 className="font-bold mb-2">Quick Links</h6>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">About</a></li>
            <li><a href="/" className="hover:underline">Contact</a></li>
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold mb-2">Follow Us</h6>
          <div className="flex gap-4 text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaFacebook />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaPinterest />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center mt-8 text-sm">
        © 2025 Artify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
