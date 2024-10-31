//@ts-nocheck

import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge } from 'lucide-react';

interface GitHubEvent {
  id: number;
  type: 'commit' | 'pull_request' | 'merge';
  user: string;
  message: string;
  timestamp: string;
}

interface GitHubMonitorProps {
  theme: any;
}

const GitHubMonitor: React.FC<GitHubMonitorProps> = ({ theme }) => {
  const mockEvents: GitHubEvent[] = [
    { id: 1, type: 'commit', user: 'Alice', message: 'Update README.md', timestamp: '2 minutes ago' },
    { id: 2, type: 'pull_request', user: 'Bob', message: 'Add new feature', timestamp: '15 minutes ago' },
    { id: 3, type: 'merge', user: 'Charlie', message: 'Merge pull request #5', timestamp: '1 hour ago' },
    { id: 4, type: 'commit', user: 'David', message: 'Fix bug in login', timestamp: '2 hours ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="h-6 w-6" style={{ color: theme.secondary }} />;
      case 'pull_request':
        return <GitPullRequest className="h-6 w-6" style={{ color: theme.primary }} />;
      case 'merge':
        return <GitMerge className="h-6 w-6" style={{ color: theme.accent }} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <h2 
          className="text-5xl font-extrabold mb-8 text-center transform -skew-x-6"
          style={{ 
            color: theme.accent,
            textShadow: `3px 3px 0px ${theme.primary}, 6px 6px 0px ${theme.secondary}`,
          }}
        >
          GitHub Activity
        </h2>
      </motion.div>

      <motion.div 
        className="rounded-lg shadow-xl p-6 relative overflow-hidden transform -skew-x-2"
        style={{ 
          backgroundColor: theme.cardBg,
          boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />

        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <motion.div
              className="flex items-center space-x-4 py-4 relative z-10"
              whileHover={{ scale: 1.02, translateX: 10 }}
              style={{
                borderBottom: `2px solid ${theme.primary}`,
                borderImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}) 1`,
              }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.cardBg}`, boxShadow: `0 0 10px ${theme.accent}` }}>
                {getIcon(event.type)}
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-lg transform -skew-x-6" style={{ 
                  color: theme.accent,
                  textShadow: `1px 1px 0px ${theme.primary}`,
                }}>
                  {event.user}
                </p>
                <p className="text-base" style={{ color: theme.text }}>
                  {event.message}
                </p>
              </div>
              
              <div className="text-sm font-mono transform skew-x-6 px-3 py-1 rounded-full"
                   style={{ 
                     backgroundColor: theme.primary,
                     color: theme.background,
                     boxShadow: `2px 2px 0px ${theme.secondary}`,
                   }}>
                {event.timestamp}
              </div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, ${theme.accent}22 25%, transparent 25%, transparent 75%, ${theme.accent}22 75%, ${theme.accent}22)`,
            backgroundSize: '60px 60px',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
};

export default GitHubMonitor;