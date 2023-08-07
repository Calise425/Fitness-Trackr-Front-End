import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRoutinesByUsername } from "../api/apiHelper";

const RoutinesByUsername = ({ token, routines, setRoutines }) => {
  const { username } = useParams();

  useEffect(() => {
    // Check if a token is available
    if (token) {
      // If token is available, fetch private and public routines
      fetchRoutinesByUsername(username, token, setRoutines)
        .then((result) => setRoutines(result))
        .catch((error) => console.error("Error fetching routines by creator", error));
    } else {
      // If no token, fetch only public routines
      fetchRoutinesByUsername(username, null, setRoutines)
        .then((result) => setRoutines(result))
        .catch((error) => console.error("Error fetching public routines by creator", error));
    }
  }, [username, token, setRoutines]);

  return (
    <div className="routine-creator-routines">
      <h2>Routines by {username}</h2>
      {routines.map((routine) => (
        <div key={routine.id} className="routine">
          <h3>{routine.name}</h3>
          <p>Goal: {routine.goal}</p>
        </div>
      ))}
    </div>
  );
};

export default RoutinesByUsername;