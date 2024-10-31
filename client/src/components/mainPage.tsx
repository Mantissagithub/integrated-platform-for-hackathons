//@ts-nocheck

import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import BackgroundAnimation from './mainPageComponents/backGroundAnimation'
import Header from './mainPageComponents/header'
import Navigation from './mainPageComponents/navigation'
import Dashboard from './mainPageComponents/dashboard'
import GitHubMonitor from './mainPageComponents/githubMonitor'
import TeamHub from './mainPageComponents/teamHub'
import HackResources from './mainPageComponents/hackResources'
import PresentationIdeation from './mainPageComponents/presentationIdeation'
import CustomCursor from './mainPageComponents/customCursor'

const customColors = {
  light: {
    primary: '#FF1744',
    secondary: '#00E5FF',
    background: '#1A237E',
    text: '#FFFFFF',
    accent: '#FFEA00',
    cardBg: '#283593',
  },
  dark: {
    primary: '#D50000',
    secondary: '#00B8D4',
    background: '#0D47A1',
    text: '#E0E0E0',
    accent: '#FFD600',
    cardBg: '#1565C0',
  }
}

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = isDarkMode ? customColors.dark : customColors.light

  // Lenticular effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-500, 500], [10, -10])
  const rotateY = useTransform(x, [-500, 500], [-10, 10])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      const handleOrientation = (event) => {
        const { beta, gamma } = event
        if (beta && gamma) {
          x.set(gamma * 10)
          y.set(beta * 10)
        }
      }

      window.addEventListener('deviceorientation', handleOrientation)

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    } else {
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        x.set(clientX - centerX)
        y.set(clientY - centerY)
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isMobile, x, y])

  useEffect(() => {
    const container = containerRef.current
    gsap.to(container, {
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      skewX: "2deg",
      ease: "power1.inOut",
    })
  }, [])

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''}`}
      style={{ 
        backgroundColor: theme.background, 
        color: theme.text,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <CustomCursor theme={theme}/>
      <BackgroundAnimation />
      <div className="flex flex-col flex-grow relative z-10">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} theme={theme}/>
        <Navigation activeTab={activeTab} handleTabChange={handleTabChange} theme={theme} />

        <div className="flex-grow flex items-center justify-center p-4 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-lg relative"
              style={{
                backgroundColor: theme.cardBg,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                ref={containerRef}
                className="absolute inset-0 bg-opacity-50 bg-black z-0"
                style={{
                  backgroundImage: `url("https://images4.alphacoders.com/133/1337090.jpeg")`,
                }}
              ></div>
              <div className="relative z-10 w-full h-full">
                {activeTab === 'dashboard' && <Dashboard theme={theme} />}
                {activeTab === 'github' && <GitHubMonitor theme={theme} />}
                {activeTab === 'teamhub' && <TeamHub theme={theme} />}
                {activeTab === 'resources' && <HackResources theme={theme} />}
                {activeTab === 'ideation' && <PresentationIdeation theme={theme} />}
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold transform -skew-x-12">
                {activeTab.toUpperCase()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}