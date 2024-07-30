import React from "react";
import SearchBar from "../Components/Searchbar";
import FloatingBox from "../Components/FloatingBox";
import ContextMenu from "../Components/ContextMenu";
import TheMagic from "../Components/TheMagic";
import Neo4jGraph from "../Components/Neo4jGraph";
import FloatingCircle from "../Components/FloatingCircle";
import ChatWindow from "../Components/ChatWindow";
import { useState } from "react";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const toggleChat = (position) => {
    setIsChatOpen(!isChatOpen);
    setCirclePosition(position);
  };

  return (
    <div>
      <SearchBar />
      <Neo4jGraph />
      <FloatingCircle
        onClick={() => toggleChat(circlePosition)}
        setPosition={setCirclePosition}
      />
      <ChatWindow
        isVisible={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        position={circlePosition}
      />
      {/* <TheMagic /> */}
      {/* <FloatingBox /> */}
      <ContextMenu />
    </div>
  );
};

export default Home;
