//@ts-nocheck

import React from 'react'
import { motion } from 'framer-motion'
import { GitBranch, GitCommit, GitPullRequest, GitMerge } from 'lucide-react'
import { gsap } from 'gsap'

const GitPanel = () => {
  // GSAP Animation for panel mounting
  React.useEffect(() => {
    gsap.fromTo(
      '.git-panel',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  return (
    <motion.div
      className="git-panel bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl text-white flex flex-wrap max-w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-purple-500 w-full">Git Status</h2>
      
      {/* Left Panel */}
      <div className="flex-1 pr-4">
        {/* Current Branch */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitBranch className="w-6 h-6 mr-2 text-green-400" />
            Current Branch
          </h3>
          <div className="bg-gray-700 rounded-md p-3 text-green-400 font-mono shadow-md">
            feature/awesome-new-feature
          </div>
        </div>

        {/* Recent Commits */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitCommit className="w-6 h-6 mr-2 text-blue-400" />
            Recent Commits
          </h3>
          <ul className="space-y-2">
            {['Update README.md', 'Fix login bug', 'Add new API endpoint'].map((commit, index) => (
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
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 pl-4">
        {/* Pull Requests */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitPullRequest className="w-6 h-6 mr-2 text-yellow-400" />
            Pull Requests
          </h3>
          <div className="bg-gray-700 rounded-md p-4 shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">New login page</span>
              <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-md text-xs font-semibold">
                In Review
              </span>
            </div>
          </div>
        </div>

        {/* Recent Merges */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitMerge className="w-6 h-6 mr-2 text-purple-400" />
            Recent Merges
          </h3>
          <div className="bg-gray-700 rounded-md p-4 shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Update dependencies</span>
              <span className="bg-purple-400 text-gray-900 px-2 py-1 rounded-md text-xs font-semibold">
                Merged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Button */}
      <motion.button
        className="mt-8 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sync with Remote
      </motion.button>
    </motion.div>
  )
}

export default GitPanel
