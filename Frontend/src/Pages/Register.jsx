import "../Style/Register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      setError("");

      await axios.post("https://musicplayer-1-hc8h.onrender.com/api/auth/register", {
        username: name,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-brand-section">
        <div className="brand-logo">
          <div className="brand-icon">♪</div>
          <span>MyMusic</span>
        </div>

        <div className="brand-content">
          <div className="brand-badge">♫ &nbsp; Your music. Your world.</div>

          <h2>
            Discover music.
            <br />
            <span>Build your sound.</span>
          </h2>

          <p>
            Create your account and step into a world built around the music you
            love.
          </p>
        </div>

        <div className="brand-wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="register-form-section">
        <div className="register-card">
          <div className="mobile-logo">
            <div className="brand-icon">♪</div>
            <span>MyMusic</span>
          </div>

          <div className="register-heading">
            <span className="heading-label">CREATE ACCOUNT</span>

            <h1>Join the music.</h1>

            <p>Create your account and start listening.</p>
          </div>

          <div className="form-group">
            <label>Full Name</label>

            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Account Type</label>

            <div className="role-options">
              <label
                className={
                  role === "user" ? "role-card role-selected" : "role-card"
                }
              >
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />

                <div className="role-icon">♫</div>

                <div className="role-info">
                  <strong>Listener</strong>
                  <span>Listen & discover music</span>
                </div>

                <div className="role-radio"></div>
              </label>

              <label
                className={
                  role === "artist" ? "role-card role-selected" : "role-card"
                }
              >
                <input
                  type="radio"
                  value="artist"
                  checked={role === "artist"}
                  onChange={(e) => setRole(e.target.value)}
                />

                <div className="role-icon">♪</div>

                <div className="role-info">
                  <strong>Artist</strong>
                  <span>Upload & share your music</span>
                </div>

                <div className="role-radio"></div>
              </label>
            </div>
          </div>

          {error && <p className="register-error">{error}</p>}

          <button className="register-button" onClick={registerUser}>
            Create Account →
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <p className="terms-text">
            By creating an account, you agree to our terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
