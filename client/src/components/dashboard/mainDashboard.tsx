//@ts-nocheck

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ExternalLink, Github, Code, Calendar } from 'lucide-react'

const MainDashboard = () => {
  const [countdown, setCountdown] = useState(3600) // Set initial countdown in seconds
  const [isCountdownStarted, setIsCountdownStarted] = useState(false) // Track if countdown is started
  const [repoLink, setRepoLink] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { user: 'AI', message: 'Hello! How can I assist you with your project?' },
  ])
  const overviewRef = useRef(null)

  useEffect(() => {
    if (overviewRef.current) {
      gsap.from(overviewRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    let interval
    if (isCountdownStarted && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCountdownStarted, countdown])

  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  const startCountdown = () => {
    setIsCountdownStarted(true)
  }

  const cloneRepo = () => {
    if (repoLink) {
      const githubDesktopLink = `github-windows://openRepo/${repoLink}`
      window.open(githubDesktopLink, '_blank')
    } else {
      alert('Please enter a valid GitHub repository link.')
    }
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    const userMessage = e.target.elements.chatInput.value
    if (userMessage) {
      setChatMessages([...chatMessages, { user: 'User', message: userMessage }])
      e.target.reset()
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { user: 'AI', message: `You said: "${userMessage}". Here’s my response...` },
        ])
      }, 1000)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <main className="grid grid-cols-3 gap-8">
        
        {/* Countdown & Hackathon Overview */}
        <motion.div
          ref={overviewRef}
          className="col-span-1 bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-bold mb-4">Hackathon Countdown</h2>
            <div className="text-5xl font-extrabold bg-gray-700 px-8 py-4 rounded-lg mb-4">
              {formatCountdown(countdown)}
            </div>
            {!isCountdownStarted ? (
              <button
                onClick={startCountdown}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
              >
                Start Countdown
              </button>
            ) : (
              <p className="text-lg font-medium text-gray-400">Countdown Running...</p>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-lg font-medium">Event Theme</h3>
                <p className="text-lg">"Building Solutions for a Sustainable Future"</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GitHub Repo Clone & Figma Design Link */}
        <motion.div
          className="col-span-1 bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Useful Tools</h2>
          <div className="space-y-6">
            {/* Figma Design Plugin */}
            <div className="flex items-center space-x-4">
              <ExternalLink className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="text-lg font-medium">Figma Design Link</h3>
                <a
                  href="https://www.figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  Open Figma to Design
                </a>
              </div>
            </div>

            {/* GitHub Repository Clone */}
            <div className="flex items-center space-x-4">
              <Github className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="text-lg font-medium">Clone Project</h3>
                <input
                  type="text"
                  placeholder="Paste GitHub repo link"
                  value={repoLink}
                  onChange={(e) => setRepoLink(e.target.value)}
                  className="text-gray-400 bg-gray-700 px-2 py-1 rounded mb-2 w-full"
                />
                <button
                  onClick={cloneRepo}
                  className="text-gray-400 hover:underline"
                >
                  Clone with GitHub Desktop
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Chat Section */}
        <motion.div
          className="col-span-1 bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">AI Chat for Ideas</h2>
          <div className="flex flex-col space-y-4 max-h-64 overflow-y-auto p-2 bg-gray-700 rounded-lg">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.user === 'AI' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`p-2 rounded-lg ${msg.user === 'AI' ? 'bg-blue-500' : 'bg-green-500'}`}
                >
                  <p className="text-white text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="mt-4 flex space-x-2">
            <input
              type="text"
              name="chatInput"
              placeholder="Ask for ideas..."
              className="w-full px-2 py-1 rounded-lg bg-gray-600 text-white"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-800 px-4 py-1 rounded-lg font-medium"
            >
              Send
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default MainDashboard
