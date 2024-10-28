//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitPullRequest, GitMerge } from 'lucide-react';
import { gsap } from 'gsap';
import axios from 'axios';

const GitPanel = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [events, setEvents] = useState([]);
  const [branch, setBranch] = useState('main');
  const [commits, setCommits] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [merges, setMerges] = useState([]);

  // GSAP Animation for panel mounting
  useEffect(() => {
    gsap.fromTo(
      '.git-panel',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  // Fetch GitHub events based on repo URL
  const fetchGitHubEvents = async () => {
    if (!repoUrl) return;

    const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/events`
      );
      setEvents(response.data);

      // Process events for commits, pull requests, and merges
      const recentCommits = response.data
        .filter(event => event.type === 'PushEvent')
        .map(event => event.payload.commits.map(commit => commit.message))
        .flat()
        .slice(0, 5);

      const recentPullRequests = response.data
        .filter(event => event.type === 'PullRequestEvent')
        .map(event => ({
          title: event.payload.pull_request.title,
          status: event.payload.action
        }))
        .slice(0, 5);

      const recentMerges = response.data
        .filter(event => event.type === 'PullRequestEvent' && event.payload.action === 'closed' && event.payload.pull_request.merged)
        .map(event => event.payload.pull_request.title)
        .slice(0, 5);

      setCommits(recentCommits);
      setPullRequests(recentPullRequests);
      setMerges(recentMerges);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  // Auto-fetch events every 2 minutes
  useEffect(() => {
    const interval = setInterval(fetchGitHubEvents, 120000);
    return () => clearInterval(interval);
  }, [repoUrl]);

  return (
    <motion.div
      className="git-panel bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl text-white flex flex-wrap max-w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-purple-500 w-full">Git Status</h2>

      {/* URL Input */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Enter GitHub repo URL (e.g., https://github.com/owner/repo)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
        />
        <button
          onClick={fetchGitHubEvents}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition-colors"
        >
          Fetch Git Data
        </button>
      </div>
      
      {/* Left Panel */}
      <div className="flex-1 pr-4">
        {/* Current Branch */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitBranch className="w-6 h-6 mr-2 text-green-400" />
            Current Branch
          </h3>
          <div className="bg-gray-700 rounded-md p-3 text-green-400 font-mono shadow-md">
            {branch}
          </div>
        </div>

        {/* Recent Commits */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitCommit className="w-6 h-6 mr-2 text-blue-400" />
            Recent Commits
          </h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {commits.length > 0 ? (
              commits.map((commit, index) => (
                <motion.li
                  key={index}
                  className="bg-gray-700 rounded-md p-3 flex items-center shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                  {commit}
                </motion.li>
              ))
            ) : (
              <p className="text-gray-400">No recent commits found.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 pl-4">
        {/* Pull Requests */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitPullRequest className="w-6 h-6 mr-2 text-yellow-400" />
            Pull Requests
          </h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {pullRequests.length > 0 ? (
              pullRequests.map((pr, index) => (
                <li
                  key={index}
                  className="bg-gray-700 rounded-md p-3 flex justify-between items-center shadow-md"
                >
                  <span>{pr.title}</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    pr.status === 'opened'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-green-400 text-gray-900'
                  }`}>
                    {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No pull requests found.</p>
            )}
          </ul>
        </div>

        {/* Recent Merges */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitMerge className="w-6 h-6 mr-2 text-purple-400" />
            Recent Merges
          </h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {merges.length > 0 ? (
              merges.map((merge, index) => (
                <li
                  key={index}
                  className="bg-gray-700 rounded-md p-3 flex justify-between items-center shadow-md"
                >
                  <span>{merge}</span>
                  <span className="bg-purple-400 text-gray-900 px-2 py-1 rounded-md text-xs font-semibold">
                    Merged
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No recent merges found.</p>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default GitPanel;
