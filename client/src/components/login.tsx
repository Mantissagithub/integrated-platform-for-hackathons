//@ts-nocheck

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { Moon, Sun, ChevronRight, User, Mail, Lock, Briefcase, Presentation, Figma, Code, Lightbulb } from 'lucide-react'

const customColors = {
  light: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F0F9FF',
    text: '#1E293B',
    accent: '#8B5CF6',
  },
  dark: {
    primary: '#60A5FA',
    secondary: '#34D399',
    background: '#0F172A',
    text: '#E2E8F0',
    accent: '#A78BFA',
  },
}

const EnhancedLogin: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline()

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.fromTo(ref, 
          { opacity: 0, y: 30, rotation: index % 2 === 0 ? 5 : -5 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: index * 0.2 }
        )
      }
    })

    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      )
    }
  }, [])

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  const colors = darkMode ? customColors.dark : customColors.light

  return (
    <div 
      className="w-screen h-screen flex transition-colors duration-500"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: colors.primary }}>Hackathon Collab</h1>
        <p className="text-xl sm:text-2xl" style={{ color: colors.secondary }}>Where innovation meets design</p>
      </motion.div>

      {/* Image Cards Section */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
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
              className="relative w-full rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <img src={src} alt={alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Icon className="text-white" size={24} />
                <span className="ml-2 text-sm font-medium text-white">{alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="w-1/2 h-full flex items-center justify-center bg-white/10 backdrop-blur-md">
        <div className="w-3/4 max-w-md p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>Login to your Account</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <AnimatePresence>
              {[
                { name: 'name', icon: User, placeholder: 'John Doe' },
                { name: 'email', icon: Mail, placeholder: 'john@example.com' },
              ].map(({ name, icon: Icon, placeholder }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    className="relative"
                  >
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} color={colors.secondary} />
                    <input
                      id={name}
                      name={name}
                      type={name.includes('password') ? 'password' : name === 'email' ? 'email' : 'text'}
                      required
                      placeholder={placeholder}
                      className="w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 transition duration-200"
                      style={{
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
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
              className="w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium text-lg transition duration-200 mt-6"
              style={{ backgroundColor: colors.accent }}
            >
              Login
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-sm text-center"
          >
            <a href="/" className="font-medium hover:underline" style={{ color: colors.primary }}>
              Don't have an Account? Sign Up
            </a>
          </motion.div>
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full transition-colors duration-300"
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

export default EnhancedLogin
