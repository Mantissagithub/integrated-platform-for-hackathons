import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  theme: any; // Accepting theme as a prop
}

const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-50"
        style={{ borderColor: theme.primary }} // Dynamic border color
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }} // Center the cursor
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-50"
        style={{ backgroundColor: theme.primary }} // Dynamic background color
        animate={{ x: mousePosition.x - 1.5, y: mousePosition.y - 1.5 }} // Center the inner dot
        transition={{ type: 'spring', stiffness: 1500, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;