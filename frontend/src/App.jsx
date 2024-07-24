import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from "./Components/Footer.jsx";
import Documentation from "./Pages/Documentation.jsx";
import EditProfile from "./Pages/EditProfile.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/documentation" element={<Documentation />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
