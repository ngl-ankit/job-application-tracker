import React from "react";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-black to-red-900 text-white text-center p-1 sm:p-4 mt-1">
      <div className="container mx-auto ">
        <div className="flex justify-center items-center space-x-4 mb-2 sm:mb-4">
          {/* Social media icons */}
          <a
            href="https://twitter.com/ngl_ankit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-300"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://github.com/ngl-ankit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://instagram.com/ngl.ankit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition duration-300"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
        {/* Contact information */}
        <p className="text-sm sm:text-base mb-2">
          Contact us:{" "}
          <a href="ngl.ankitgujjar@gmail.com" className="underline">
            ngl.ankitgujjar@gmail.com
          </a>
        </p>
        {/* Copyright notice */}
        <p className="text-xs sm:text-sm">
          &copy; {currentYear} [ Creator: Ankit-gujjar ] . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
