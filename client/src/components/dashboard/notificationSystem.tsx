//@ts-nocheck

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulating incoming notifications
    const notificationTypes = [
      { type: 'info', message: 'New team member joined the project' },
      { type: 'success', message: 'Your code has been approved' },
      { type: 'warning', message: 'Approaching project deadline' },
    ]

    const interval = setInterval(() => {
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      setNotifications(prev => [...prev, { id: Date.now(), ...randomNotification }])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            className={`mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between ${
              notification.type === 'info'
                ? 'bg-blue-500'
                : notification.type === 'success'
                ? 'bg-green-500'
                : 'bg-yellow-500'
            }`}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              <p className="text-white">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem