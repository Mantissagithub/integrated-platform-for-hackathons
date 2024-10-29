//@ts-nocheck

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "Alice", text: "Hey team, how's the progress?", isAI: false },
    { id: 2, user: "Bob", text: "Working on the backend, almost done!", isAI: false },
    { id: 3, user: "Charlie", text: "UI is coming along nicely!", isAI: false },
    { id: 4, user: "AI Assistant", text: "Great work, team! Remember to take breaks and stay hydrated.", isAI: true },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg: Message = {
        id: messages.length + 1,
        user: "You",
        text: newMessage,
        isAI: false
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          user: "AI Assistant",
          text: "That's an interesting point! Have you considered...",
          isAI: true
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Team Hub</h2>
      <div className="rounded-lg shadow-md p-4" style={{ backgroundColor: theme.cardBg }}>
        <div className="h-96 overflow-y-auto mb-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start space-x-2 mb-4 ${msg.isAI ? 'justify-end' : ''}`}
            >
              {!msg.isAI && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`flex flex-col ${msg.isAI ? 'items-end' : ''}`}>
                <span className="font-semibold text-sm">{msg.user}</span>
                <span className={`py-2 px-4 rounded-lg ${msg.isAI ? 'bg-secondary text-white' : 'bg-gray-100 dark:bg-gray-700'}`} style={{ backgroundColor: msg.isAI ? theme.secondary : theme.cardBg }}>
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
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 p-2 rounded-l-md border ${theme.border} bg-white dark:bg-gray-800`}
            style={{ borderColor: theme.border }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className={`bg-primary text-white px-4 py-2 rounded-r-md flex items-center`}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TeamHub;