//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, MessageSquare, Coffee } from 'lucide-react';

interface HackResourcesProps {
  theme: any;
}

const HackResources: React.FC<HackResourcesProps> = ({ theme }) => {
  const resources = [
    { title: "API Documentation", icon: Code },
    { title: "Design Inspiration", icon: Zap },
    { title: "Tech Talks", icon: MessageSquare },
    { title: "Mentor Connection", icon: Coffee },
  ];

  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.cardBg }}>
      <h2 className={`text-2xl font-semibold mb-4 ${theme.text}`}>Hack Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-md flex items-center space-x-3 cursor-pointer"
            style={{ backgroundColor: theme.cardBg === '#FFFFFF' ? '#F3F4F6' : '#4B5563' }} // Light and dark mode backgrounds
          >
            <resource.icon className={`h-6 w-6 ${theme.primary}`} />
            <span className={theme.text}>{resource.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HackResources;