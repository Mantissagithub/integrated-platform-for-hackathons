//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Code } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header
      className={`flex justify-between items-center mb-6 p-4 rounded-lg shadow-md 
                  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
                  mb-3 mt-1 ml-2 mr-2`}
    >
      <motion.div
        className="flex items-center space-x-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Code className={`h-8 w-8 ${isDarkMode ? 'text-primary' : 'text-gray-800'}`} />
        <h1 className="text-3xl font-bold">HackDash</h1>
      </motion.div>
      <motion.div
        className="flex items-center space-x-4"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-200 
                      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-blue-500" />}
        </motion.button>
      </motion.div>
    </header>
  );
};

export default Header;