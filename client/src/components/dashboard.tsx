//@ts-nocheck

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Bell, Code, GitBranch, Settings, Users, Plus, Minus, Move, Menu, X, ChevronDown, Search, MessageSquare, Video, PieChart, LogOut, Send, Rocket, Clock, GitCommit, Upload, Zap } from 'lucide-react'

const teamMembers = [
  { id: 1, name: "You", role: "Full Stack Developer", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
  { id: 2, name: "Alice", role: "UI/UX Designer", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
  { id: 3, name: "Bob", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32", status: "offline" },
  { id: 4, name: "Charlie", role: "Data Scientist", avatar: "/placeholder.svg?height=32&width=32", status: "busy" },
]

const mockAIResponses = [
  "Based on your project idea, I suggest starting with a simple prototype that demonstrates the core functionality. Focus on the unique value proposition of your hackathon project.",
  "For your tech stack, consider using React for the frontend and Node.js with Express for the backend. This combination allows for rapid development and easy deployment.",
  "To optimize your workflow, try using Git for version control and set up a simple CI/CD pipeline with GitHub Actions. This will help automate your testing and deployment process.",
  "Don't forget to prepare a compelling pitch for your project. Focus on the problem you're solving, your solution's uniqueness, and potential impact. Practice your presentation timing as well.",
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("collaboration")
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState("#4F46E5")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { sender: "Alice", message: "Hey team! Let's brainstorm our hackathon project idea." },
    { sender: "You", message: "I was thinking we could build a real-time collaboration tool for remote teams." },
    { sender: "Bob", message: "That sounds interesting! What specific problem would it solve?" },
  ])
  const [aiMessages, setAiMessages] = useState([
    { sender: "AI Assistant", message: "Hello! I'm here to help with any questions or suggestions for your hackathon project. What's your initial idea?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [aiInputMessage, setAiInputMessage] = useState("")

  const sidebarRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      }
    }
  }, [])

  useEffect(() => {
    const sidebar = sidebarRef.current
    gsap.to(sidebar, {
      width: sidebarOpen ? "16rem" : "5rem",
      duration: 0.3,
      ease: "power2.inOut"
    })
  }, [sidebarOpen])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.beginPath()
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        setIsDrawing(true)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineWidth = brushSize
        ctx.strokeStyle = brushColor
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        ctx.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { sender: "You", message: inputMessage }])
      setInputMessage("")
    }
  }

  const sendAiMessage = () => {
    if (aiInputMessage.trim()) {
      setAiMessages([...aiMessages, { sender: "You", message: aiInputMessage }])
      setAiInputMessage("")
      // Simulate AI response
      setTimeout(() => {
        const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
        setAiMessages(prev => [...prev, { sender: "AI Assistant", message: randomResponse }])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside ref={sidebarRef} className="bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-blue-600"
          >
            {sidebarOpen ? "Hackathon" : "HC"}
          </motion.h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold text-gray-600">Team</h2>
            <div className="space-y-1">
              {teamMembers.map((member) => (
                <motion.button
                  key={member.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full mr-2" />
                  {sidebarOpen && (
                    <>
                      <div className="flex flex-col items-start">
                        <span>{member.name}</span>
                        <span className="text-xs text-gray-500">{member.role}</span>
                      </div>
                      <span className={`ml-auto h-2 w-2 rounded-full ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <img src={teamMembers[0].avatar} alt={teamMembers[0].name} className="h-8 w-8 rounded-full mr-2" />
            {sidebarOpen && (
              <>
                <span>{teamMembers[0].name}</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Hackathon Project</h2>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm font-medium"
              >
                <Clock className="mr-2 h-4 w-4" />
                32:00:00
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-4">
            <div className="flex space-x-1 rounded-xl bg-gray-200 p-1">
              {["collaboration", "code", "deploy"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-white shadow-sm' : 'hover:bg-gray-300'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab === "collaboration" && <Users className="inline-block mr-2 h-4 w-4" />}
                  {tab === "code" && <Code className="inline-block mr-2 h-4 w-4" />}
                  {tab === "deploy" && <Rocket className="inline-block mr-2 h-4 w-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "collaboration" && (
              <motion.div
                key="collaboration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 md:grid-cols-2"
              >
                <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Idea Canvas</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-4 items-center">
                      <motion.button
                        onClick={clearCanvas}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                      >
                        Clear Canvas
                      </motion.button>
                      <div className="flex items-center space-x-2">
                        <label htmlFor="brushSize" className="text-sm font-medium">
                          Brush Size:
                        </label>
                        <input
                          type="range"
                          id="brushSize"
                          min="1"
                          max="20"
                          step="1"
                          value={brushSize}
                          onChange={(e) => setBrushSize(parseInt(e.target.value))}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label htmlFor="brushColor" className="text-sm font-medium">
                          Color:
                        </label>
                        <input
                          type="color"
                          id="brushColor"
                          value={brushColor}
                          onChange={(e) => setBrushColor(e.target.value)}
                          className="w-8 h-8 rounded-full overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="border rounded-md p-1 bg-gray-100">
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        className="w-full cursor-crosshair"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Team Chat</h3>
                  <div className="h-64 overflow-y-auto mb-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start space-x-2 ${msg.sender === 'You' ? 'justify-end' : ''}`}
                      >
                        {msg.sender !== 'You' && (
                          
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            {msg.sender[0]}
                          </div>
                        )}
                        <div className={`rounded-lg p-2 ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        {msg.sender === 'You' && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            {msg.sender[0]}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text"
                      placeholder="Type a message..." 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.button
                      onClick={sendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      Send
                    </motion.button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
                  <div className="h-64 overflow-y-auto mb-4 space-y-4">
                    {aiMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start space-x-2 ${msg.sender === 'You' ? 'justify-end' : ''}`}
                      >
                        {msg.sender !== 'You' && (
                          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                            AI
                          </div>
                        )}
                        <div className={`rounded-lg p-2 ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-purple-100'}`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        {msg.sender === 'You' && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            {msg.sender[0]}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text"
                      placeholder="Ask AI for help..." 
                      value={aiInputMessage}
                      onChange={(e) => setAiInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <motion.button
                      onClick={sendAiMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200"
                    >
                      Ask
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 h-full"
              >
                <h3 className="text-xl font-semibold mb-4">Web-based IDE</h3>
                <div className="h-[calc(100%-2rem)] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-100 text-gray-500">
                  VS Code for the Web or code-server would be embedded here
                </div>
              </motion.div>
            )}

            {activeTab === "deploy" && (
              <motion.div
                key="deploy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 md:grid-cols-2"
              >
                <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Deployment Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">Current Status</h4>
                        <p className="text-sm text-gray-500">Last deployed 2 hours ago</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Live</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Build</span>
                      <span>Deploy</span>
                      <span>Live</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Git Operations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Current Branch</h4>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <GitBranch className="h-5 w-5" />
                        <span>main</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Pending Changes</h4>
                      <div className="h-24 overflow-y-auto border rounded-md p-2">
                        <ul className="list-disc list-inside text-gray-600">
                          <li>Modified: src/components/Dashboard.tsx</li>
                          <li>Added: src/utils/api.ts</li>
                          <li>Deleted: src/old-component.tsx</li>
                          <li>Modified: README.md</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        <GitCommit className="inline-block mr-2 h-4 w-4" />
                        Commit Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
                      >
                        <Upload className="inline-block mr-2 h-4 w-4" />
                        Push to Remote
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Deployment Options</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {['Vercel', 'Netlify', 'GitHub Pages'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input type="radio" name="deploymentOption" className="form-radio text-blue-600" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Rocket className="inline-block mr-2 h-4 w-4" />
                      Deploy Project
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}