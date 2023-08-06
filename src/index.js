import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {Login, Home, Register, UserProfile} from "./components"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setAndStoreToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
  <BrowserRouter>
    <div id="nav">
      <header>
        {/* <img src={companyLogo} /> */}
        <h1>Fitness Trackr</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to={token ? "/profile" : "/"}>
          {token ? "Profile" : null}
        </Link>
        {token ? <div onClick={logout}>Logout</div> : <Link to = "/login">Login</Link>}
      </nav>
    </div>
    <Switch>
      <Route exact path="/">
        <Home setUser = {setUser} />
      </Route>

      <Route path="/login">
        <Login 
        setToken={setAndStoreToken}/>
      </Route>

      <Route path="/register">
        <Register 
        setToken={setAndStoreToken}/>
      </Route>

      <Route path={`/users/${user}`}>
        <UserProfile 
        user = {user}
        token = {token}/>
      </Route>

      {/* <Route path="/activities">
        <Activities />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/create_routine">
        <MakeRoutine />
      </Route>

      <Route path="/create_activity">
        <MakeActivity />
      </Route> */}

    </Switch>
  </BrowserRouter>
)}

ReactDOM.render(<App />, document.getElementById("app"));