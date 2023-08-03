import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/apiCalls";


const Register = ({
  setToken
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(
      username,
      password,
      setToken,
      setLoggedIn,
      setSuccess,
      setError
    );
    setUsername("");
    setPassword("");
    setPassConfirm("");
  };

  return (
    <div className="form">
      <h2>Create an Account</h2>
      <p>
        Already a user? Click <Link to="/login">here</Link>
      </p>

      <form onSubmit={handleSubmit}>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          required
          value={passConfirm}
          placeholder="Re-enter your password"
          minLength="8"
          maxLength="20"
          onChange={(e) => setPassConfirm(e.target.value)}
        />
        <button>Register</button>
        {password !== passConfirm ? <p>Passwords do not match</p> : null}
      </form>
      {success ? <h2>Successfully registered!</h2> : null}
      {error.length ? <p>{error}</p> : null}
    </div>
  );
};

export default Register;
