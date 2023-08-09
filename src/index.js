import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams, BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  Login, 
  RoutineList, 
  Register, 
  MyRoutines, 
  ActivitiesList,
  CreateRoutine,
  ActivityRoutines,
  RoutinesByUsername
} from "./components";

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Fitness Trackr!</h2>
      <p>Please Register or Login to create routines and activities for yourself</p>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [me, setMe] = useState("")
  const [routines, setRoutines] = useState([]);
  const { username } = useParams();


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
          <h1>Fitness Trackr</h1>
        </header>
        <nav>
          <Link to="/routines">Routines</Link>
          <Link to="/activities">Activities</Link>
          <Link to={token ? "/my-routines" : "/login"}>{token ? "My Routines" : "Login"}</Link>
          {token && <a onClick={logout}>Logout</a>}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<RoutineList routines={routines} setRoutines={setRoutines} />} />
        <Route path="/login" element={<Login setToken={setAndStoreToken} setUser = {setMe} />} />
        <Route path="/register" element={<Register setToken={setAndStoreToken} setUser = {setMe} />} />
        <Route path="/my-routines" element={<MyRoutines setUser={setUser} token={token} routines={routines} setRoutines={setRoutines}/>} />
        <Route path="/activities" element={<ActivitiesList token={token} />} />
        <Route path="/activities/:activityId" element={<ActivityRoutines />} />
        <Route path="/users/:username" element={<RoutinesByUsername token={token} routines={routines} creatorName={username} setRoutines={setRoutines} />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));