//@ts-client

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoadingPage() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(12)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      navigate('/mainPage') // Replace with your actual next page route
    }
  }, [timeLeft, navigate])

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-black via-purple-900 to-red-900 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Cropped video frame without visible YouTube branding */}
      <motion.div
        className="relative w-full max-w-3xl aspect-video border-4 border-red-600 shadow-lg rounded-lg overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative overflow-hidden w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/OJixXuR7Xcc?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0"
            allow="autoplay; encrypted-media"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-[1.3] w-[120%] h-[120%]"
            style={{ border: 'none' }}
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-500 opacity-40 mix-blend-overlay"></div>
        </div>
      </motion.div>

      {/* Comic-style Title and Countdown */}
      <motion.div
        className="mt-8 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse text-yellow-400 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Entering the Spider-Verse!
        </h1>
        <p className="text-2xl mb-2 text-pink-200">Hang tight, spider-friend!</p>
        <p className="text-lg text-blue-300">Swinging to Main Page in {timeLeft} seconds...</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{ width: `${((12 - timeLeft) / 12) * 100}%` }}
        transition={{ duration: 1 }}
      />

      {/* Animated comic dots (Spider-Verse style) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20 shadow-lg"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  )
}
