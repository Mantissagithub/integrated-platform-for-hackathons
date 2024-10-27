//@ts-nocheck

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainDashboard from './dashboard/mainDashboard'
import GitPanel from './dashboard/gitPanel'
import CommunicationToolbar from './dashboard/communicationToolbar'
import CodeReviewArea from './dashboard/codeReview'
import NotificationSystem from './dashboard/notificationSystem'
import OnboardingWalkthrough from './dashboard/onBoardWlakThrough'
import TabNavigation from './dashboard/tabNavigation'

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const tabs = ['Dashboard', 'Git', 'Code Review']

  // Removed GSAP animation effect

  const tabContent = {
    Dashboard: <MainDashboard />,
    Git: <GitPanel />,
    'Code Review': <CodeReviewArea />,
  }

  return (
    <div className="relative bg-gray-900 text-white h-screen flex flex-col w-screen">
      {/* Optional Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="container mx-auto px-4 py-8 flex-grow relative z-10">
        <header className="mt-2 mb-2 text-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text header-text shadow-md">
            HackCollab Platform
          </h1>
          <p className="text-gray-300 mt-2 header-text text-lg">Collaborate, Code, Create</p>
        </header>

        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div
          key={activeTab}
          className="p-4 rounded-lg bg-gray-800 shadow-md"
        >
          {tabContent[activeTab]}
        </div>
      </div>

      <CommunicationToolbar />
      <NotificationSystem />

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingWalkthrough onComplete={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App