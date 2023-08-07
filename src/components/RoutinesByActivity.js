import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicRoutinesByActivityId } from "../api/apiHelper";

const ActivityRoutines = () => {
  const { activityId } = useParams();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (activityId) {
      fetchPublicRoutinesByActivityId(activityId)
        .then((result) => setRoutines(result))
        .catch((error) => console.error("Error fetching routines by activity", error));
    }
  }, [activityId]);

  return (
    <div className="routines-by-activity">
      <h2>Routines featuring Activity ID: {activityId}</h2>
      {routines.map((routine) => (
        <div key={routine.id} className="routine">
          <h3>{routine.name}</h3>
          <p>Goal: {routine.goal}</p>
        </div>
      ))}
    </div>
  );
};
export default ActivityRoutines;