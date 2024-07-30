import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { FaCommentDots } from "react-icons/fa";

const FloatingCircle = ({ onClick, setPosition }) => {
  const dragControls = useDragControls();
  const [position, setLocalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (event, info) => {
    setLocalPosition(info.point);
    setPosition(info.point);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      onClick(position);
    }
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: window.innerWidth - 80 }}
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        position: "fixed",
        bottom: "2.5rem",
        right: "2.5rem",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}>
      <FaCommentDots className="text-white text-xl" />
    </motion.div>
  );
};

export default FloatingCircle;
