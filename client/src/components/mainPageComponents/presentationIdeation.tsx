//@ts-nocheck

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, PenTool, Presentation, Save, Plus, Trash2, Sparkles, Zap } from 'lucide-react';

interface PresentationIdeationProps {
  theme: any;
}

interface IdeaNote {
  id: number;
  content: string;
}

const PresentationIdeation: React.FC<PresentationIdeationProps> = ({ theme }) => {
  const [ideas, setIdeas] = useState<IdeaNote[]>([
    { id: 1, content: "Introduce the problem we're solving" },
    { id: 2, content: "Demo our solution with a live example" },
    { id: 3, content: "Highlight key technical challenges overcome" },
  ]);
  
  const [newIdea, setNewIdea] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');

  const addIdea = () => {
    if (newIdea.trim() !== '') {
      setIdeas([...ideas, { id: Date.now(), content: newIdea }]);
      setNewIdea('');
    }
  };

  const removeIdea = (id: number) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const generateScript = () => {
    const mockScript = `
    Introduction: "Hello everyone! We're excited to present our solution to [Problem Statement].
    
    Our Approach: We tackled this challenge by [Brief explanation of your approach].
    
    Key Features: Our solution includes [List 2-3 key features].
    
    Technical Implementation: We used [List key technologies] to build our solution.
    
    Demo: Let's take a quick look at how it works. [Describe demo steps]
    
    Impact: Our solution has the potential to [Describe potential impact].
    
    Future Plans: Moving forward, we plan to [Mention 1-2 future enhancements].
    
    Thank you for your attention. We're now open for any questions!"
    `;
    setGeneratedScript(mockScript);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.h2 
        className="text-5xl font-extrabold mb-8 text-center transform -skew-x-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        style={{ 
          color: theme.accent,
          textShadow: `3px 3px 0px ${theme.primary}, 6px 6px 0px ${theme.secondary}`,
        }}
      >
        Presentation Ideation
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="rounded-lg shadow-xl relative overflow-hidden"
          style={{ 
            backgroundColor: theme.cardBg,
            boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
               }}
          />
          
          <div className="p-6 relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center transform -skew-x-6" style={{ color: theme.accent }}>
              <Lightbulb className="mr-2 h-6 w-6" style={{ color: theme.secondary }} />
              Brainstorming Board
            </h3>
            
            <AnimatePresence mode="popLayout">
              {ideas.map((idea) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex items-center justify-between p-4 rounded-lg mb-3 transform -skew-x-2"
                  style={{ 
                    backgroundColor: `${theme.cardBg}33`,
                    boxShadow: `3px 3px 0px ${theme.primary}`,
                    border: `2px solid ${theme.accent}33`
                  }}
                >
                  <span className="font-bold" style={{ color: theme.text }}>{idea.content}</span>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeIdea(idea.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-6 flex rounded-lg overflow-hidden transform -skew-x-2"
                 style={{ border: `2px solid ${theme.accent}33` }}>
              <input
                type="text"
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="Add a new idea..."
                className="flex-1 p-3 bg-white dark:bg-gray-800"
                style={{ color: theme.text }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addIdea}
                className="px-6 py-3 flex items-center font-bold"
                style={{ backgroundColor: theme.primary, color: theme.background }}
              >
                <Plus className="h-5 w-5 mr-2" /> Add
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
          className="rounded-lg shadow-xl relative overflow-hidden"
          style={{ 
            backgroundColor: theme.cardBg,
            boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
               }}
          />
          
          <div className="p-6 relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center transform -skew-x-6" style={{ color: theme.accent }}>
              <Sparkles className="mr-2 h-6 w-6" style={{ color: theme.secondary }} />
              AI Script Generator
            </h3>
            
            <p className="mb-6 font-medium" style={{ color: theme.text }}>
              Click the button below to generate a presentation script based on your ideas.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95, rotate: 2 }}
              onClick={generateScript}
              className="px-8 py-4 rounded-lg font-bold flex items-center justify-center mb-6 transform -skew-x-2"
              style={{ 
                backgroundColor: theme.secondary,
                color: theme.background,
                boxShadow: `4px 4px 0px ${theme.accent}`,
              }}
            >
              <Zap className="h-5 w-5 mr-2" />
              Generate Script
            </motion.button>
            
            <AnimatePresence>
              {generatedScript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 rounded-lg relative"
                  style={{ 
                    backgroundColor: `${theme.cardBg}33`,
                    border: `2px solid ${theme.accent}33`,
                  }}
                >
                  <h4 className="font-bold mb-4 transform -skew-x-6" style={{ color: theme.accent }}>
                    Generated Script:
                  </h4>
                  <p className="whitespace-pre-wrap font-medium" style={{ color: theme.text }}>
                    {generatedScript}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PresentationIdeation;