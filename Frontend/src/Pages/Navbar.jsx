import { Link } from "react-router-dom";
import "../Style/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-container">
        <img src="/Music_Logo.png" alt="logo" className="logo-img" />
        <span className="logo-text"></span>
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/login">Login</Link>
      </div>

    </nav>
  );
}

export default Navbar;