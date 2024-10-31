//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, MessageSquare, Coffee } from 'lucide-react';

interface HackResourcesProps {
  theme: any;
}

const HackResources: React.FC<HackResourcesProps> = ({ theme }) => {
  const resources = [
    { title: "API Documentation", icon: Code, color: theme.primary },
    { title: "Design Inspiration", icon: Zap, color: theme.secondary },
    { title: "Tech Talks", icon: MessageSquare, color: theme.accent },
    { title: "Mentor Connection", icon: Coffee, color: theme.text },
  ];

  return (
    <div className="p-6 rounded-lg shadow-xl relative overflow-hidden" 
         style={{ 
           backgroundColor: theme.cardBg,
           boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
         }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />
      <motion.h2 
        className="text-4xl font-extrabold mb-8 text-center transform -skew-x-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        style={{ 
          color: theme.text,
          textShadow: `2px 2px 0px ${theme.accent}, 4px 4px 0px ${theme.primary}`,
        }}
      >
        Hack Resources
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95, rotate: 2 }}
            className="p-6 rounded-lg flex items-center space-x-4 cursor-pointer relative overflow-hidden"
            style={{ 
              backgroundColor: theme.cardBg,
              boxShadow: `5px 5px 0px ${resource.color}`,
              transform: 'skew(-3deg)',
            }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />
            <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: resource.color }}>
              <resource.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold relative z-10" style={{ 
              color: theme.text,
              textShadow: `1px 1px 0px ${resource.color}`,
            }}>
              {resource.title}
            </span>
            <div className="absolute bottom-0 right-0 w-12 h-12 opacity-10"
                 style={{
                   backgroundImage: `radial-gradient(circle, ${resource.color} 10%, transparent 10.01%)`,
                   backgroundSize: '1em 1em',
                   backgroundPosition: 'bottom right',
                 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HackResources;