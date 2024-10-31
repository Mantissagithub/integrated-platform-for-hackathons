//@ts-nocheck

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { Moon, Sun, ChevronRight, User, Mail, Lock, Briefcase, Presentation, Figma, Code, Lightbulb } from 'lucide-react'
import {loginSchema} from "../../../common/authSchema";

const spiderVerseColors = {
  dark: {
    primary: '#FF1744',
    secondary: '#00E5FF',
    background: '#1A237E',
    text: '#FFFFFF',
    accent: '#FFEA00',
    formBg: 'rgba(255, 255, 255, 0.1)',
  },
  light: {
    primary: '#D32F2F',
    secondary: '#0277BD',
    background: '#E3F2FD',
    text: '#263238',
    accent: '#FFC107',
    formBg: 'rgba(38, 50, 56, 0.1)',
  }
}

const SpiderVerseLogin: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({email : " ", password : " "})
  const [errors, setErrors] = useState({})
  const formRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const colors = darkMode ? spiderVerseColors.dark : spiderVerseColors.light

  useEffect(() => {
    const tl = gsap.timeline()
    const {signupSchema, loginSchema} = require("../common/authSchema");
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.fromTo(ref, 
          { opacity: 0, y: 30, rotation: index % 2 === 0 ? 5 : -5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', delay: index * 0.1 }
        )
      }
    })

    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.2, ease: 'power3.out' }
      )
    }
  }, [])

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.1 } },
    blur: { scale: 1, transition: { duration: 0.1 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  }

  return (
    <div 
      className={`w-screen h-screen flex relative overflow-hidden transition-colors duration-500 ${darkMode ? 'dark' : ''}`}
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Comic-style background elements */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-20 transition-opacity duration-500 ${darkMode ? 'opacity-20' : 'opacity-10'}`}></div>
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full filter blur-3xl opacity-20 animate-pulse transition-colors duration-500 ${darkMode ? 'bg-blue-500' : 'bg-red-500'}`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full filter blur-3xl opacity-20 animate-pulse transition-colors duration-500 ${darkMode ? 'bg-purple-500' : 'bg-yellow-500'}`}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-8 left-8 text-center z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-comic" style={{ color: colors.primary }}>HackDash</h1>
        {/* <p className="text-xl sm:text-2xl font-comic" style={{ color: colors.secondary }}>Where innovation swings into action!</p> */}
      </motion.div>

      {/* Image Cards Section */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-4 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { src: 'https://media.istockphoto.com/id/1318360204/photo/team-meeting-and-brainstorming-in-modern-office.jpg?s=2048x2048&w=is&k=20&c=SkzLULKbTDf6U5jVN6DnjtnkYyV_jalx3hH5kg8yJ8E=', alt: 'Team brainstorming', icon: Lightbulb },
            { src: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Coding session', icon: Code },
            { src: 'https://plus.unsplash.com/premium_photo-1661775083116-3e8fbb1d5a7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Design review', icon: Figma },
            { src: 'https://media.istockphoto.com/id/1333390966/photo/diverse-employees-on-online-conference-video-call-on-tv-screen-in-meeting-room.jpg?s=2048x2048&w=is&k=20&c=zOKo0bgrIYhxO4KQouyhslGItFB9Cx8UxDiY_8_0MfQ=', alt: 'Project presentation', icon: Presentation },
          ].map(({ src, alt, icon: Icon }, index) => (
            <motion.div
              key={src}
              ref={el => imageRefs.current[index] = el}
              className="relative w-full rounded-lg overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-300"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <img src={src} alt={alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 flex items-end justify-center pb-4">
                <Icon className="text-white" size={24} />
                <span className="ml-2 text-sm font-medium text-white font-comic">{alt}</span>
              </div>
              <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiI+PC9yZWN0Pgo8L3N2Zz4=')] mix-blend-multiply transition-opacity duration-500 ${darkMode ? 'opacity-50' : 'opacity-30'}`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="w-1/2 h-full flex items-center justify-center z-10">
        <div className="w-3/4 max-w-md p-8 rounded-xl shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-500" style={{ backgroundColor: colors.formBg }}>
          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${darkMode ? 'from-blue-600/30 to-purple-600/30' : 'from-red-400/30 to-yellow-400/30'}`}></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 font-comic" style={{ color: colors.accent }}>Swing into Action!</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 relative z-10">
            <AnimatePresence>
              {[
                { name: 'email', icon: Mail, placeholder: 'your@spider.verse' },
                { name: 'password', icon: Lock, placeholder: 'Secret Web-Shooter Code' },
              ].map(({ name, icon: Icon, placeholder }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="relative"
                  >
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: colors.secondary }} />
                    <input
                      id={name}
                      name={name}
                      type={name.includes('password') ? 'password' : name === 'email' ? 'email' : 'text'}
                      required
                      placeholder={placeholder}
                      className="w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 transition-all duration-200 bg-white/20 backdrop-blur-sm font-comic"
                      style={{
                        borderColor: colors.secondary,
                        color: colors.text,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-md font-medium text-lg transition-all duration-200 mt-6 font-comic relative overflow-hidden"
              style={{ backgroundColor: colors.accent, color: darkMode ? '#000000' : '#FFFFFF' }}
            >
              <span className="relative z-10">Thwip Into Action!</span>
              <ChevronRight className="ml-2 h-5 w-5 relative z-10" />
              <div className={`absolute inset-0 opacity-50 transition-opacity duration-500 ${darkMode ? 'bg-gradient-to-r from-yellow-300 to-yellow-500' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}></div>
            </motion.button>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-6 text-sm text-center relative z-10"
          >
            <a href="/" className="font-medium hover:underline font-comic" style={{ color: colors.secondary }}>
              New to the HackDash? Join the Web!
            </a>
          </motion.div>
        </div>
      </div>

      {/* Comic-style caption */}
      <div className={`absolute bottom-4 right-4 p-2 transform rotate-3 shadow-lg z-20 transition-colors duration-500 ${darkMode ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'}`}>
        <p className="font-bold font-comic text-sm">POW! Login for an amazing adventure!</p>
      </div>

      {/* Dark Mode Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full transition-all duration-300 z-20"
        style={{
          backgroundColor: darkMode ? colors.text : colors.background,
          color: darkMode ? colors.background : colors.text,
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </div>
  )
}

export default SpiderVerseLogin