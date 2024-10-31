//@ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, MessageSquare, Zap } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
  isAI: boolean;
}

interface TeamHubProps {
  theme: any;
}

const TeamHub: React.FC<TeamHubProps> = ({ theme }) => {
  const [teamMessages, setTeamMessages] = useState<Message[]>([
    { id: 1, user: "Alice", text: "Hey team, how's the progress?", isAI: false },
    { id: 2, user: "Bob", text: "Working on the backend, almost done!", isAI: false },
    { id: 3, user: "Charlie", text: "UI is coming along nicely!", isAI: false },
  ]);
  
  const [aiMessages, setAiMessages] = useState<Message[]>([
    { id: 1, user: "You", text: "Can you help me with optimizing our code?", isAI: false },
    { id: 2, user: "AI Assistant", text: "I'd be happy to help. What specific part of the code are you looking to optimize?", isAI: true },
  ]);
  
  const [newTeamMessage, setNewTeamMessage] = useState('');
  const [newAiMessage, setNewAiMessage] = useState('');
  const teamChatRef = useRef<HTMLDivElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);

  const handleSendTeamMessage = () => {
    if (newTeamMessage.trim() !== '') {
      const newMsg: Message = {
        id: teamMessages.length + 1,
        user: "You",
        text: newTeamMessage,
        isAI: false
      };
      setTeamMessages([...teamMessages, newMsg]);
      setNewTeamMessage('');
    }
  };

  const handleSendAiMessage = () => {
    if (newAiMessage.trim() !== '') {
      const newMsg: Message = {
        id: aiMessages.length + 1,
        user: "You",
        text: newAiMessage,
        isAI: false
      };
      setAiMessages([...aiMessages, newMsg]);
      setNewAiMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: aiMessages.length + 2,
          user: "AI Assistant",
          text: "That's an interesting point! Let me analyze that for you...",
          isAI: true
        };
        setAiMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (teamChatRef.current) {
      teamChatRef.current.scrollTop = teamChatRef.current.scrollHeight;
    }
    if (aiChatRef.current) {
      aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
    }
  }, [teamMessages, aiMessages]);

  const chatContainerStyle = {
    backgroundColor: theme.cardBg,
    boxShadow: `0 0 20px ${theme.accent}, inset 0 0 30px rgba(0,0,0,0.2)`,
  };

  const messageStyle = (isAI: boolean) => ({
    backgroundColor: isAI ? theme.secondary : theme.primary,
    color: theme.background,
    boxShadow: `3px 3px 0px ${isAI ? theme.accent : theme.secondary}`,
    transform: 'skew(-5deg)',
  });

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
        Team Hub
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Chat */}
        <motion.div 
          className="rounded-lg shadow-xl p-4 relative overflow-hidden"
          style={chatContainerStyle}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h3 className="text-2xl font-bold mb-4 transform -skew-x-6" style={{ color: theme.accent }}>
            <MessageSquare className="inline-block mr-2" /> Team Chat
          </h3>
          <div ref={teamChatRef} className="h-96 overflow-y-auto mb-4 space-y-4">
            <AnimatePresence>
              {teamMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, x: msg.isAI ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-2 ${msg.isAI ? 'justify-end' : ''}`}
                >
                  {!msg.isAI && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`flex flex-col ${msg.isAI ? 'items-end' : ''}`}>
                    <span className="font-bold text-sm" style={{ color: theme.accent }}>{msg.user}</span>
                    <span className="py-2 px-4 rounded-lg" style={messageStyle(msg.isAI)}>
                      {msg.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTeamMessage}
              onChange={(e) => setNewTeamMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-l-md border bg-white dark:bg-gray-800"
              style={{ borderColor: theme.border, color: theme.text }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendTeamMessage}
              className="px-4 py-2 rounded-r-md flex items-center"
              style={{ backgroundColor: theme.primary, color: theme.background }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* AI Chat */}
        <motion.div 
          className="rounded-lg shadow-xl p-4 relative overflow-hidden"
          style={chatContainerStyle}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h3 className="text-2xl font-bold mb-4 transform -skew-x-6" style={{ color: theme.accent }}>
            <Zap className="inline-block mr-2" /> AI Assistant
          </h3>
          <div ref={aiChatRef} className="h-96 overflow-y-auto mb-4 space-y-4">
            <AnimatePresence>
              {aiMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, x: msg.isAI ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-2 ${msg.isAI ? 'justify-end' : ''}`}
                >
                  {!msg.isAI && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`flex flex-col ${msg.isAI ? 'items-end' : ''}`}>
                    <span className="font-bold text-sm" style={{ color: theme.accent }}>{msg.user}</span>
                    <span className="py-2 px-4 rounded-lg" style={messageStyle(msg.isAI)}>
                      {msg.text}
                    </span>
                  </div>
                  {msg.isAI && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.secondary }}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex">
            <input
              type="text"
              value={newAiMessage}
              onChange={(e) => setNewAiMessage(e.target.value)}
              placeholder="Ask AI Assistant..."
              className="flex-1 p-2 rounded-l-md border bg-white dark:bg-gray-800"
              style={{ borderColor: theme.border, color: theme.text }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendAiMessage}
              className="px-4 py-2 rounded-r-md flex items-center"
              style={{ backgroundColor: theme.secondary, color: theme.background }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamHub;