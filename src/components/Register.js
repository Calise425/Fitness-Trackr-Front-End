import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiHelper";


const Register = ({setToken, setUser}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password, setToken, setMessage, setSuccess, setUser);
      setUsername("");
      setPassword("");
      setPassConfirm("");
      navigate("/my-routines");
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div className="login-form">
      <h2>Create an Account</h2>
      <p className = "form-text">
        Already a user? Click <Link to="/login">here</Link>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>Username:</label>
        <input
          type="text"
          required
          value={username}
          placeholder="Enter your username"
          minLength="5"
          maxLength="20"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          placeholder="Enter your password"
          minLength="5"
          maxLength="20"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          required
          value={passConfirm}
          placeholder="Re-enter your password"
          minLength="5"
          maxLength="20"
          onChange={(e) => setPassConfirm(e.target.value)}
        />
        <button>Register</button>
        {password !== passConfirm ? <p>Passwords do not match</p> : null}
      </form>
      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default Register;
