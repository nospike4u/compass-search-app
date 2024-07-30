import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ChatWindow = ({ isVisible, onClose, position }) => {
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const calculatePosition = () => {
      const chatWidth = 320;
      const chatHeight = 320;

      let x = position.x;
      let y = position.y;

      if (x + chatWidth > window.innerWidth) {
        x = window.innerWidth - chatWidth;
      }
      if (x < 0) {
        x = 0;
      }

      if (y + chatHeight > window.innerHeight) {
        y = window.innerHeight - chatHeight;
      }
      if (y < 0) {
        y = 0;
      }

      setChatPosition({ x, y });
    };

    calculatePosition();
  }, [position]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        left: chatPosition.x,
        top: chatPosition.y,
      }}
      className={`w-80 h-80 bg-white shadow-lg rounded-lg ${
        isVisible ? "block" : "hidden"
      }`}>
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <p>Conversation text here...</p>
        </div>
        <div className="border-t border-gray-200">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border-none focus:outline-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
