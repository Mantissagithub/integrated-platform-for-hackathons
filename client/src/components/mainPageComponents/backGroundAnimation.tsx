import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const BackgroundAnimation: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.bg-element')
    elements.forEach((el) => {
      gsap.to(el, {
        x: `random(-20, 20, 5)`,
        y: `random(-20, 20, 5)`,
        rotation: `random(-15, 15, 5)`,
        duration: 'random(15, 30)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="bg-element absolute opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, #8B5CF6, transparent)`,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundAnimation