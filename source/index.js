import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const setAndStoreToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  <BrowserRouter>
    <div id="nav">
      <header>
        <img src={companyLogo} />
        <h1>Fitness Trackr</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to={token ? "/profile" : "/"}>
          {token ? "Profile" : null}
        </Link>
        <Link to={token ? "/logout" : "/login"}>
          {token ? "Logout" : "Login"}
        </Link>
      </nav>
    </div>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login 
        setToken={setAndStoreToken}/>
      </Route>

      <Route exact path="/register">
        <Register 
        setToken={setAndStoreToken}/>
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route exact path="/create_routine">
        <MakeRoutine />
      </Route>

    </Switch>
  </BrowserRouter>
}

ReactDOM.render(<App />, document.getElementById("app"));