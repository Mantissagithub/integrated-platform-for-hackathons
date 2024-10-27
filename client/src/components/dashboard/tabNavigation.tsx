//@ts-nocheck

import React from 'react'
import { motion } from 'framer-motion'

interface TabProps {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabNavigation: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  if (!tabs || tabs.length === 0) {
    return null // Return null if tabs is undefined or empty
  }

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === tab
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab(tab)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  )
}

export default TabNavigation