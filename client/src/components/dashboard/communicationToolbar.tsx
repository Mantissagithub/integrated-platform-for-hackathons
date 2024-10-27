//@ts-nocheck

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Video, Mic, X } from 'lucide-react'
import { gsap } from 'gsap'

const CommunicationToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  // GSAP for staggered animation of the buttons
  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded)

    if (!isExpanded) {
      gsap.fromTo(
        ".toolbar-button",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      )
    }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-gray-800 rounded-full shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 bg-gray-800 rounded-lg p-6 w-72 shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="space-y-6">
              {/* Team Chat */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Team Chat</h3>
                <div className="bg-gray-700 rounded-md p-3 h-32 overflow-y-auto">
                  <div className="text-sm text-gray-300">
                    <p><strong>Alice:</strong> Hey team, how's it going?</p>
                    <p><strong>Bob:</strong> Making progress on the API!</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="mt-3 w-full bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Video Call */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Video Call</h3>
                <motion.button
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Video Call
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar Buttons */}
      <div className="flex items-center space-x-2">
        <motion.button
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 m-1 shadow-md toolbar-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleExpandToggle}
        >
          {isExpanded ? <X /> : <MessageSquare />}
        </motion.button>

        <AnimatePresence>
          {!isExpanded && (
            <>
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 m-1 shadow-md toolbar-button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Video />
              </motion.button>
              <motion.button
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 m-1 shadow-md toolbar-button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mic />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CommunicationToolbar
