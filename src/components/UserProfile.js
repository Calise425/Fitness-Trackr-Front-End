import { useState } from "react";
import {fetchRoutinesbyUsername} from "../api/apiHelper.js"

const UserProfile = (user, token) => {
  const [routines, setRoutines] = useState("");
  
  fetchRoutinesbyUsername(user, token, setRoutines);

  return (
    <div>
      {routines.map((routine) => (
          <div key={routine.id} className="routine">
            <h2 className="routine-name">{routine.name}</h2>
            <p className="goal">{routine.goal}</p>
            <div className="activity-attached-to-routine">
              {routine.activities.map((activity) => {
                return (
                  <p>
                    {activity.name} | {activity.description} | {activity.duration} | {activity.count}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserProfile;