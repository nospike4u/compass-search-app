import React from "react";
import SearchBar from "../Components/Searchbar";
import FloatingBox from "../Components/FloatingBox";
import ContextMenu from "../Components/ContextMenu";
import TheMagic from "../Components/TheMagic";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <TheMagic />
      {/* <FloatingBox /> */}
      <ContextMenu />
    </div>
  );
};

export default Home;
