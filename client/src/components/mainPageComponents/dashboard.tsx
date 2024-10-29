//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Users, Award } from 'lucide-react';

interface DashboardProps {
  theme: any;
}

const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
  const stats = [
    { icon: Clock, label: 'Time Remaining', value: '36:00:00' },
    { icon: Zap, label: 'Lines of Code', value: '1,337' },
    { icon: Users, label: 'Team Members', value: '4' },
    { icon: Award, label: 'Challenges Completed', value: '2/5' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Welcome, Hacker!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 rounded-lg shadow-md"
            style={{ backgroundColor: theme.cardBg }} // Use theme.cardBg for background
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-8 w-8 ${theme.primary}`} /> {/* Use theme.primary for icon color */}
              <span className={`text-2xl font-bold ${theme.text}`}>{stat.value}</span> {/* Use theme.text for value color */}
            </div>
            <p className={`text-sm ${theme.text} dark:text-gray-400`}>{stat.label}</p> {/* Use theme.text for label color */}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="p-6 rounded-lg shadow-md"
        style={{ backgroundColor: theme.cardBg }} // Use theme.cardBg for background
      >
        <h3 className={`text-2xl font-semibold mb-4 ${theme.text}`}>Team Motivation</h3> {/* Use theme.text for title color */}
        <p className={`text-lg mb-4 italic ${theme.text}`}>
          "Innovation distinguishes between a leader and a follower." - Steve Jobs
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-200`}
          style={{ backgroundColor: theme.primary }} // Use theme.primary for button background
        >
          Get Inspired
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;