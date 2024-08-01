import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ChatWindow = ({ isVisible, onClose, position }) => {
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const calculatePosition = () => {
      const chatWidth = 320;
      const chatHeight = 400;

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      className={`w-80 h-96 bg-white shadow-lg rounded-lg ${
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
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}>
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-200 p-2">
          <Form setMessages={setMessages} messages={messages} />
        </div>
      </div>
    </motion.div>
  );
};

const Form = ({ setMessages, messages }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);

    const response = await fetch(
      "http://localhost:8000/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          provider: "open-ai",
          mode: "development",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [...messages, newMessage],
          stream: true,
        }),
      }
    );

    setMessage("");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let result;
    const messageId = crypto.randomUUID();
    while (!(result = await reader.read()).done) {
      const chunk = decoder.decode(result.value, { stream: true });
      const lines = chunk.split("\n");

      lines.forEach((line) => {
        if (line.startsWith("data:")) {
          const jsonStr = line.replace("data:", "").trim();
          try {
            const data = JSON.parse(jsonStr);
            const content = data.choices[0]?.delta?.content;
            if (content) {
              setMessages((prev) => {
                const found = prev.find((m) => m.id === messageId);

                if (found) {
                  return prev.map((m) =>
                    m.id === messageId
                      ? { ...m, content: `${m.content}${content}` }
                      : m
                  );
                }

                return [...prev, { role: "assistant", content, id: messageId }];
              });
            }
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        }
      });
    }
  };

  return (
    <form className="flex flex-col w-full" onSubmit={onSubmit}>
      <textarea
        name="message"
        placeholder="Type your message here"
        onChange={handleChange}
        value={message}
        className="block w-full p-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Send
      </button>
    </form>
  );
};

export default ChatWindow;
