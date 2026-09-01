import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Pages/Navbar.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import UploadMusic from "./Pages/Musicupload.jsx";
import Home from "./Pages/Home.jsx";
import "./Style/App.css";


function AppContent() {

  const location = useLocation();

  // navbar hide on login & register
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;