import React from "react";
import SearchBar from "../Components/Searchbar";
import FloatingBox from "../Components/FloatingBox";
import ContextMenu from "../Components/ContextMenu";
import TheMagic from "../Components/TheMagic";
import Neo4jGraph from "../Components/Neo4jGraph";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <Neo4jGraph />
      {/* <TheMagic /> */}
      {/* <FloatingBox /> */}
      <ContextMenu />
    </div>
  );
};

export default Home;
