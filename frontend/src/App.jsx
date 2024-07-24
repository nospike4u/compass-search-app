import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Footer from './Components/Footer.jsx';
import Documentation from './Pages/Documentation.jsx';
import EditProfile from './Pages/EditProfile.jsx';

import X from './Components/X.jsx'

function App() {
  return (
    <>
      <X />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route
          path="/documentation"
          element={<Documentation />}
        ></Route>
        <Route
          path="/editprofile"
          element={<EditProfile />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;