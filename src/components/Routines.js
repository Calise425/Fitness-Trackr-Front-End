import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicRoutines } from "../api/apiHelper";

const RoutineList = ({ routines, setRoutines }) => {

  useEffect(() => {
    fetchPublicRoutines(setRoutines);
  }, []);

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
              <h3>Activities:</h3>
              {routine.activities.map((activity) => (
                <p key={activity.id}>
                  <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
                  {" | "}
                  {activity.description} | Duration: {activity.duration} | Count: {activity.count}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineList;