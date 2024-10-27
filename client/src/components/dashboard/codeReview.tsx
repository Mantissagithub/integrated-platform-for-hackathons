//@ts-nocheck

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, MessageSquare, Bot, Wand } from 'lucide-react'

const CodeReviewArea = () => {
  const [approvals, setApprovals] = useState(2)
  const [rejections, setRejections] = useState(1)
  const [comments, setComments] = useState([
    { user: 'Alice', comment: 'Looks good to me!' },
    { user: 'Bob', comment: 'Can we optimize this loop?' },
  ])

  const totalReviews = 5
  const approvalPercentage = (approvals / totalReviews) * 100

  const handleAISuggestion = () => {
    setComments([...comments, { user: 'AI Assistant', comment: 'Refining the loop will improve performance by 20%' }])
  }

  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-8 shadow-2xl min-w-screen  mx-auto flex overflow-y-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Left Section: Pull Request and Status */}
      <div className="w-1/2 pr-8">
        <h2 className="text-3xl font-extrabold mb-8 text-purple-500 tracking-wide text-center">Code Review</h2>
        <div className="space-y-8">
          {/* Pull Request */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Pull Request: Add User Authentication</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto text-gray-300">
                <code>{`function authenticateUser(username, password) {
  // TODO: Implement secure authentication
  return true;
}`}</code>
              </pre>
            </div>
          </div>

          {/* Review Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Review Status</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-800 rounded-full h-6">
                <motion.div
                  className="bg-green-500 h-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${approvalPercentage}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
              <span className="text-sm font-medium text-gray-300">{approvals}/{totalReviews} Approvals</span>
            </div>
          </div>

          {/* Approve and Reject Buttons */}
          <div className="flex space-x-6 justify-center">
            <motion.button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-lg transition-colors shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setApprovals(approvals + 1)}
            >
              <Check className="w-6 h-6 mr-2" />
              Approve
            </motion.button>
            <motion.button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-lg transition-colors shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRejections(rejections + 1)}
            >
              <X className="w-6 h-6 mr-2" />
              Request Changes
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right Section: Comments and AI Suggestions */}
      <div className="w-1/2 pl-8">
        {/* Comments */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Comments</h3>
          <div className="space-y-4 mb-6">
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-md p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="font-bold text-gray-300">{comment.user}</p>
                <p className="text-sm text-gray-400">{comment.comment}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex space-x-4">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-lg transition-colors shadow-lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">AI Assistant</h3>
          <motion.div
            className="bg-gray-800 rounded-md p-6 flex items-center justify-between space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-300 flex-1">
              <p className="font-semibold mb-2">AI Suggestion:</p>
              <p className="text-sm">"Refining the loop could improve performance by 20%."</p>
            </div>
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAISuggestion}
            >
              <Wand className="w-6 h-6" />
              Apply Suggestion
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CodeReviewArea
