import React from 'react'
import { motion } from 'framer-motion'
import { Home, Code, MessageSquare, Coffee, Zap } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  handleTabChange: (tab: string) => void
  theme: any
}

const tabData = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'github', label: 'Github Monitor', icon: Code },
  { id: 'teamhub', label: 'Team Hub', icon: MessageSquare },
  { id: 'resources', label: 'Hack Resources', icon: Coffee },
  { id: 'ideation', label: 'Presentation Ideation', icon: Zap },
]

const Navigation: React.FC<NavigationProps> = ({ activeTab, handleTabChange, theme }) => {
  return (
    <nav className="mb-6 m-2 rounded-lg">
      <ul className="flex space-x-2 overflow-x-auto pb-2">
        {tabData.map((tab, index) => (
          <motion.li
            key={tab.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center p-3 rounded-md transition-all duration-200 ease-in-out ${
                activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? theme.primary : 'transparent',
                color: activeTab === tab.id ? theme.background : theme.text,
              }}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation