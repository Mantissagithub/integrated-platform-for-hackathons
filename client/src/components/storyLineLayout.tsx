import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import BackgroundAnimation from './mainPageComponents/backGroundAnimation';
import Header from './mainPageComponents/header';
import CustomCursor from './mainPageComponents/customCursor';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const customColors = {
  light: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F7FFF7',
    text: '#1A535C',
    accent: '#FFE66D',
    cardBg: '#FFFFFF',
  },
  dark: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#1A535C',
    text: '#F7FFF7',
    accent: '#FFE66D',
    cardBg: '#2C7A7B',
  }
};

const menuItems = [
  { id: 'dashboard', title: 'Your Journey Begins' },
  { id: 'github', title: 'Tracking Progress' },
  { id: 'teamhub', title: 'Assembling Your Team' },
  { id: 'resources', title: 'Gathering Resources' },
  { id: 'ideation', title: 'The Final Showdown' },
];

export default function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const containerRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? customColors.dark : customColors.light;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionIndex = menuItems.findIndex(item => item.id === sectionId);
    if (sectionIndex !== -1) {
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: { y: `${sectionIndex * 100}vh`, autoKill: false },
        ease: 'power2.inOut',
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className={`min-h-screen w-screen ${isDarkMode ? 'dark' : ''} overflow-hidden`}
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <CustomCursor theme={theme}/>
      <BackgroundAnimation />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
          >
            <motion.div
              className="text-6xl font-bold text-white font-comic"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              Loading...
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen"
          >
            <nav className="w-64 bg-cardBg p-4 overflow-y-auto fixed left-0 top-0 h-full z-20">
              <div className="mb-8">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </div>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id} className="mb-4">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left p-2 rounded transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <main ref={containerRef} className="flex-1 overflow-y-auto ml-64 relative z-10">
              <StorylineLayout theme={theme} setActiveSection={setActiveSection} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
