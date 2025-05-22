import React, { useState, useEffect, useRef } from 'react';
import './chatBox.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Improved response logic
  const getAIResponse = (userInput) => {
    const inputLower = userInput.toLowerCase().trim();
    
    if (/hello|hi|hey/i.test(inputLower)) {
      const greetings = [
        "Hi there! 😊 What can I do for you?",
        "Hello! How can I assist you today?",
        "Hey! Nice to see you. What's on your mind?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (/help|support/i.test(inputLower)) {
      return "I can help with general questions, recommendations, or just chat. What do you need?";
    }
    
    if (/thank|thanks/i.test(inputLower)) {
      return "You're welcome! Let me know if you need anything else.";
    }
    
    if (/bye|goodbye/i.test(inputLower)) {
      return "Goodbye! Have a great day! 👋";
    }
    
    // Default intelligent responses
    const responses = [
      "Interesting! Tell me more about that.",
      "I see. What else would you like to know?",
      "That's a good point. Have you considered...",
      "Let me think about that... Can you elaborate?",
      "Thanks for sharing. What's your main concern about this?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI typing
    setIsTyping(true);
    const typingDelay = 800 + Math.random() * 1500; // 0.8-2.3 sec delay
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    }, typingDelay);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`ai-assistant ${isOpen ? 'open' : ''}`}>
      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>AI Assistant</h3>
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>
          
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="message ai-message typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSend} 
              className="send-btn"
              disabled={isTyping || input.trim() === ''}
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      {/* Floating action button */}
      <button className="assistant-btn" onClick={toggleChat}>
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <span className="ai-icon">
            Need Help?
          </span>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;