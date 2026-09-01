import { Link } from "react-router-dom";
import "../Style/Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/mymusic_logo.png" alt="logo" className="logo-img" />
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>

        {role === "artist" && <Link to="/upload">Upload</Link>}

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
