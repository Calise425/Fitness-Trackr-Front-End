import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/apiHelper.js";

const Login = ({setToken, setUser}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password, setToken, setMessage, setSuccess, setUser);
      setUsername("");
      setPassword("");
      navigate("/my-routines");
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div className="login-form">
      <h2>Login</h2>
      <p className = "form-text">
        New User? Register <Link to="/register">here</Link>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>Username:</label>
        <input
          type="text"
          required
          value={username}
          placeholder="Enter your username"
          minLength="8"
          maxLength="20"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          placeholder="Enter your password"
          minLength="8"
          maxLength="20"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default Login;