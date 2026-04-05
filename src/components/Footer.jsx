import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-32 py-10 text-gray-300 text-center bg-gradient-to-b from-black via-gray-900 to-black border-t border-gray-800 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        {/* Logo / Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500"
        >
          TradeBook
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 text-sm sm:text-base max-w-md"
        >
          Empowering Indian traders to trade smarter every day.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex space-x-6 text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { icon: <FaGithub />, link: "https://github.com/" },
            { icon: <FaLinkedin />, link: "https://linkedin.com/" },
            { icon: <FaTwitter />, link: "https://twitter.com/" },
            { icon: <FaEnvelope />, link: "mailto:yourmail@example.com" },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -3, textShadow: "0 0 8px #fff" }}
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Divider line */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />

        {/* Motivational tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-400 text-xs sm:text-sm italic"
        >
          “Trade smart. Trade consistently. Grow daily.”
        </motion.p>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.02, textShadow: "0 0 6px #fff" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs text-gray-500"
        >
          © 2025 TradeBook. Built with ❤️ by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 font-semibold">
            Swati Dwivedi
          </span>
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
