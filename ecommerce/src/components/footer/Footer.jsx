
/**
 * Footer Component
 * ----------------
 * Displays the website footer with:
 * - Brand name
 * - Copyright text
 * - Social media icons
 */

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    /* Footer container */
    <footer className="bg-pink-600 text-white py-6">
      <div className="flex flex-col items-center gap-3">

        {/* Brand Name */}
        <h1 className="text-xl font-semibold">
          E-bharat
        </h1>

        {/* Copyright Information */}
        <p className="text-sm opacity-90">
          © 2024 ebharat — @ebharat
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-5 mt-2">
          
          {/* Facebook */}
          <a href="#" className="hover:opacity-80 transition">
            <FaFacebookF />
          </a>

          {/* Twitter */}
          <a href="#" className="hover:opacity-80 transition">
            <FaTwitter />
          </a>

          {/* Instagram */}
          <a href="#" className="hover:opacity-80 transition">
            <FaInstagram />
          </a>

          {/* LinkedIn */}
          <a href="#" className="hover:opacity-80 transition">
            <FaLinkedinIn />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;




