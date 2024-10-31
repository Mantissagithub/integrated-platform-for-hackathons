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
    <div className="p-6 space-y-6 relative">
      <motion.h2 
        className="text-5xl font-extrabold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        style={{ 
          color: theme.accent,
          textShadow: `2px 2px 0px ${theme.primary}, 4px 4px 0px ${theme.secondary}`,
          transform: 'skew(-5deg)',
        }}
      >
        Welcome, Hacker!
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
            className="p-6 rounded-lg shadow-lg relative overflow-hidden"
            style={{ 
              backgroundColor: theme.cardBg,
              boxShadow: `0 0 20px ${theme.accent}`,
              transform: 'skew(-2deg)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            ></div>
            <div className="flex items-center justify-between mb-2 relative z-10">
              <stat.icon className="h-10 w-10" style={{ color: theme.accent }} />
              <span className="text-3xl font-bold" style={{ color: theme.text, textShadow: `2px 2px 0px ${theme.primary}` }}>{stat.value}</span>
            </div>
            <p className="text-sm font-semibold mt-2 relative z-10" style={{ color: theme.secondary }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
        className="p-8 rounded-lg shadow-xl relative overflow-hidden"
        style={{ 
          backgroundColor: theme.cardBg,
          boxShadow: `0 0 30px ${theme.primary}`,
          transform: 'skew(-1deg)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
        <h3 className="text-3xl font-extrabold mb-6 relative z-10" style={{ color: theme.accent, textShadow: `2px 2px 0px ${theme.primary}` }}>Team Motivation</h3>
        <p className="text-xl mb-6 italic font-bold relative z-10" style={{ color: theme.text, textShadow: `1px 1px 0px ${theme.primary}` }}>
          "Innovation distinguishes between a leader and a follower." - Steve Jobs
        </p>
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95, rotate: 2 }}
          className="px-8 py-3 rounded-md text-lg font-bold relative z-10 overflow-hidden"
          style={{ 
            backgroundColor: theme.accent,
            color: theme.background,
            boxShadow: `3px 3px 0px ${theme.primary}, 6px 6px 0px ${theme.secondary}`,
          }}
        >
          Get Inspired
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 z-0 transform -skew-x-12"></div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;