import React, { useState, useEffect } from "react";
import {fetchPublicRoutines} from "../api/apiHelper";
import {Link} from "react-router-dom"

//ADD SUB NAV- SEARCH BAR? 
//RENDER ACTIVITES/ROUTINE DEPENDING ON HOW THEYRE RETURNED
const Home = () => {
  const [routines, setRoutines] = useState([]);


  useEffect(()=>{
    fetchPublicRoutines(setRoutines);
  }, [])

  return (
    <div className="routines-container">
      <div className="sub-nav">
        <h2>Public Routines</h2>
      </div>

      <div className="routines">
        {routines.map((routine) => (
          <div key={routine.id} className="routine">
            <h2 className="routine-name">
              {routine.name} | <Link to={`/users/${routine.creatorName}`}>{routine.creatorName}</Link>
            </h2>
            <p className="goal">{routine.goal}</p>
            <div className="activity-attached-to-routine">
              {routine.activities.map((activity) => {
                return (
                  <p key = {activity.id}>
                    {activity.name} | {activity.description} | {activity.duration} | {activity.count}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;