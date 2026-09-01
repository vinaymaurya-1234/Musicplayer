import "../Style/Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Details = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                { identifier, password },
                { withCredentials: true }
            );

            console.log(res.data);
            navigate("/upload");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-wrapper">

            <div className="login-left">
                <h2>♪ MyMusic</h2>
                <p>♫ Your music. Your world.</p>

                <div className="left-content">
                    <h1>
                        Welcome back.<br />
                        Keep the music playing.
                    </h1>
                    <p>Sign in and continue your journey through the music you love.</p>
                </div>
            </div>

            <div className="login-right">
                <div className="Container">
                    <span className="heading-small">WELCOME BACK</span>

                    <h1>Good to see you.</h1>
                    <p className="top">Login to continue listening.</p>

                    <label>Email or Username</label>
                    <input
                        type="text"
                        placeholder="you@example.com"
                        onChange={(e) => setIdentifier(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button id="btn" onClick={Details}>
                        Log In →
                    </button>

                    <p className="bottom">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;