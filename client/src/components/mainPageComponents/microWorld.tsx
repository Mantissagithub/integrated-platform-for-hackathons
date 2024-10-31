//@ts-nocheck

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Dashboard from './dashboard';
import GitHubMonitor from './githubMonitor';
import TeamHub from './teamHub';
import HackResources from './hackResources';
import PresentationIdeation from './presentationIdeation';

const areas = [
  { id: 'dashboard', name: 'Dashboard', x: 0, y: 0, component: Dashboard },
  { id: 'github', name: 'GitHub Monitor', x: -100, y: -100, component: GitHubMonitor },
  { id: 'teamhub', name: 'Team Hub', x: 100, y: -100, component: TeamHub },
  { id: 'resources', name: 'Hack Resources', x: -100, y: 100, component: HackResources },
  { id: 'ideation', name: 'Presentation Ideation', x: 100, y: 100, component: PresentationIdeation },
];

export default function MicroWorld({ theme }) {
  const [activeArea, setActiveArea] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const miniMapScale = useTransform(scale, [1, 4], [1, 0.25]);
  const miniMapOpacity = useTransform(scale, [1, 2], [0, 1]);

  const handleAreaClick = (area) => {
    if (activeArea === area.id) {
      setIsZoomed(!isZoomed);
      scale.set(isZoomed ? 1 : 4);
      x.set(isZoomed ? 0 : -area.x * 4);
      y.set(isZoomed ? 0 : -area.y * 4);
    } else {
      setActiveArea(area.id);
      setIsZoomed(true);
      scale.set(4);
      x.set(-area.x * 4);
      y.set(-area.y * 4);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden" ref={containerRef}>
      <motion.div
        className="absolute w-full h-full"
        style={{ x, y, scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {areas.map((area) => (
          <motion.div
            key={area.id}
            className="absolute p-4 rounded-xl shadow-lg cursor-pointer"
            style={{
              x: area.x,
              y: area.y,
              width: '200px',
              height: '200px',
              backgroundColor: theme.cardBg,
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleAreaClick(area)}
          >
            <h3 className="text-lg font-bold mb-2">{area.name}</h3>
            {isZoomed && activeArea === area.id && (
              <area.component theme={theme} />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Mini-map */}
      <motion.div
        className="absolute bottom-4 right-4 w-48 h-48 bg-black/20 rounded-lg overflow-hidden"
        style={{ opacity: miniMapOpacity }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ scale: miniMapScale }}
        >
          {areas.map((area) => (
            <motion.div
              key={area.id}
              className="absolute w-8 h-8 bg-white/50 rounded-sm cursor-pointer"
              style={{ x: area.x / 2 + 24, y: area.y / 2 + 24 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleAreaClick(area)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}