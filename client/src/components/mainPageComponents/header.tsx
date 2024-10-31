//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Code, Zap } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: any;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, theme }) => {
  return (
    <motion.header
      className="flex justify-between items-center p-6 rounded-lg shadow-xl relative overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ 
        backgroundColor: theme?.cardBg || '#ffffff',
        boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />
      
      <motion.div
        className="flex items-center space-x-4 relative z-10"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <div className="relative">
          <Code className="h-10 w-10 absolute" style={{ color: theme.secondary }} />
          <Zap className="h-10 w-10 absolute" style={{ color: theme.primary }} />
        </div>
        <h1 className="text-5xl font-extrabold transform -skew-x-6"
            style={{ 
              color: theme.text,
              textShadow: `3px 3px 0px ${theme.primary}, 6px 6px 0px ${theme.secondary}`,
            }}>
          HackDash
        </h1>
      </motion.div>
      
      <motion.div
        className="relative z-10"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9, rotate: -15 }}
          onClick={toggleDarkMode}
          className="p-3 rounded-full relative"
          style={{ 
            backgroundColor: isDarkMode ? theme.primary : theme.secondary,
            boxShadow: `3px 3px 0px ${theme.accent}`,
          }}
        >
          {isDarkMode ? (
            <Sun className="h-8 w-8" style={{ color: theme.cardBg }} />
          ) : (
            <Moon className="h-8 w-8" style={{ color: theme.cardBg }} />
          )}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={false}
            animate={{ 
              boxShadow: isDarkMode 
                ? `0 0 10px ${theme.primary}, 0 0 20px ${theme.primary}`
                : `0 0 10px ${theme.secondary}, 0 0 20px ${theme.secondary}`
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </motion.header>
  );
};

export default Header;