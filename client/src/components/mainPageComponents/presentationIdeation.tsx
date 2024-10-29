//@ts-nocheck

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Presentation, Save, Plus, Trash2, Sparkles } from 'lucide-react';

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
    // This is a mock function. In a real application, you'd call an AI service here.
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
      <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Presentation Ideation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg shadow-md"
          style={{ backgroundColor: theme.cardBg }}
        >
          <h3 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Brainstorming Board
          </h3>
          <div className="space-y-4 items-center">
            {ideas.map((idea) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-2 rounded-md m-3"
                style={{ backgroundColor: theme.cardBg === '#FFFFFF' ? '#F3F4F6' : '#4B5563' }} // Light and dark mode backgrounds
              >
                <span className={theme.text}>{idea.content}</span>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex p-2 m-3 rounded-md">
            <input
              type="text"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              placeholder="Add a new idea..."
              className={`flex-1 p-2 rounded-l-md border ${theme.border} bg-white dark:bg-gray-700`}
              style={{ borderColor: theme.border }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addIdea}
              className={`bg-primary text-white px-4 py-2 rounded-r-md flex items-center`}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-lg shadow-md m-2"
          style={{ backgroundColor: theme.cardBg }}
        >
          <h3 className={`text-xl font-semibold mb-4 flex items-center p-2 m-2 ${theme.text}`}>
            <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
            AI Script Generator
          </h3>
          <p className={`mb-4 p-2 ${theme.text}`}>Click the button below to generate a presentation script based on your ideas.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateScript}
            className={`bg-secondary text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-200 mb-4 p-2 m-2`}
          >
            Generate Script
          </motion.button>
          {generatedScript && (
            <div className={`p-4 rounded-md`} style={{ backgroundColor: theme.cardBg }}>
              <h4 className={`font-semibold mb-2 ${theme.text}`}>Generated Script:</h4>
              <p className={`whitespace-pre-wrap ${theme.text}`}>{generatedScript}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PresentationIdeation;