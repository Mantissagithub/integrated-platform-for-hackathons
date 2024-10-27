//@ts-nocheck

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X } from 'lucide-react'

const OnboardingWalkthrough = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const steps = [
    {
      title: 'Welcome to HackCollab!',
      description: "Let's get you started with our awesome platform.",
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      title: 'Collaborate in Real-time',
      description: 'Use our web-based IDE to code together with your team.',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor your project status and Git activity in one place.',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      title: 'Review and Improve',
      description: 'Use our code review system to ensure high-quality submissions.',
      image: '/placeholder.svg?height=200&width=200',
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsVisible(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="w-full h-48 object-cover rounded-md mb-4"
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h2
              className="text-2xl font-bold mb-2 text-purple-400"
              key={`title-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {steps[currentStep].title}
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-6"
              key={`description-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {steps[currentStep].description}
            </motion.p>
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                className={`text-white ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-400'
                } transition-colors`}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
              <button
                onClick={nextStep}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Finish' : <ChevronRight className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OnboardingWalkthrough
