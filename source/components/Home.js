import React, { useState, useEffect } from "react";
import {fetchPublicRoutines} from "../api/helperCalls";

const Home = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(()=>{
    fetchPublicRoutines(setRoutines);
  }, [])

  return (
    <div className = "routines-container">
      <div className = "sub-nav">

      </div>

      <div className = "routines">
        {routines.map((routine)=>(
          <div key = {routine.id} className = "routine">
            <h2 className = "routine-name">
              {routine.name}
            </h2>
            <p className = "goal">{routine.goal}</p>
            <p className = "creatorName">{routine.creatorName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;