//@ts-nocheck

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundAnimation from './mainPageComponents/backGroundAnimation';
import Header from './mainPageComponents/header';
import Navigation from './mainPageComponents/navigation';
import Dashboard from './mainPageComponents/dashboard';
import GitHubMonitor from './mainPageComponents/githubMonitor';
import TeamHub from './mainPageComponents/teamHub';
import HackResources from './mainPageComponents/hackResources';
import PresentationIdeation from './mainPageComponents/presentationIdeation';
import CustomCursor from './mainPageComponents/customCursor';

const customColors = {
  light: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F0F4F8',
    text: '#1F2937',
    accent: '#8B5CF6',
    cardBg: '#FFFFFF',
  },
  dark: {
    primary: '#60A5FA',
    secondary: '#34D399',
    background: '#0F172A',
    text: '#E2E8F0',
    accent: '#A78BFA',
    cardBg: '#1E293B',
  }
};

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? customColors.dark : customColors.light;

  return (
    <div
      className={`h-screen w-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <CustomCursor theme={theme}/>
      <BackgroundAnimation />
      <div className="flex flex-col flex-grow">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Navigation activeTab={activeTab} handleTabChange={handleTabChange} theme={theme} />

        <div className="flex-grow flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-lg"
              style={{ backgroundColor: theme.cardBg }}
            >
              {activeTab === 'dashboard' && <Dashboard theme={theme} />}
              {activeTab === 'github' && <GitHubMonitor theme={theme} />}
              {activeTab === 'teamhub' && <TeamHub theme={theme} />}
              {activeTab === 'resources' && <HackResources theme={theme} />}
              {activeTab === 'ideation' && <PresentationIdeation theme={theme} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}