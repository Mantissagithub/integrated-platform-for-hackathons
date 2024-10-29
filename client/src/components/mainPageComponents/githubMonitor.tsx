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
        return <GitCommit className={`h-5 w-5 ${theme.secondary}`} />;
      case 'pull_request':
        return <GitPullRequest className={`h-5 w-5 ${theme.primary}`} />;
      case 'merge':
        return <GitMerge className={`h-5 w-5 ${theme.accent}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>GitHub Activity</h2>
      <div className="rounded-lg shadow-md p-4" style={{ backgroundColor: theme.cardBg }}>
        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center space-x-4 py-3 border-b last:border-b-0`}
            style={{ borderColor: theme.text === '#E2E8F0' ? '#4B5563' : '#E5E7EB' }} // Adjust border color based on theme text color
          >
            {getIcon(event.type)}
            <div className="flex-1">
              <p className="font-semibold">{event.user}</p>
              <p className={`text-sm ${theme.text} dark:text-gray-400`}>{event.message}</p>
            </div>
            <span className={`text-xs ${theme.text}`}>{event.timestamp}</span> {/* Use theme.text for timestamp color */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GitHubMonitor;