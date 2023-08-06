import React, { useState, useEffect } from "react";
import { fetchActivities, makeActivities } from "../api/apiHelper";
const Activities = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetchActivities()
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error fetching activities", error));
  }, []);
  const handleMakeActivities = (e) => {
    e.preventDefault();
    // Check if the activity already exists
    const existingActivity = activities.find(
      (activity) => activity.name === newActivityName
    );
    if (existingActivity) {
      setError("Activity already exists");
      return;
    }
    // Create the new activity
    makeActivities(token, newActivityName, newActivityDescription)
      .then((newActivity) => {
        setActivities([...activities, newActivity]);
        setNewActivityName("");
        setNewActivityDescription("");
        setError("");
      })
      .catch((error) => console.error("Error creating activity", error));
  };
  return (
    <div>
      <h2>Activities</h2>
      {token && (
        <form onSubmit={handleMakeActivities}>
          <label>Name:</label>
          <input
            type="text"
            value={newActivityName}
            required
            onChange={(e) => setNewActivityName(e.target.value)}
          />
          <label>Description:</label>
          <input
            type="text"
            value={newActivityDescription}
            required
            onChange={(e) => setNewActivityDescription(e.target.value)}
          />
          <button>Create Activity</button>
          {error && <p>{error}</p>}
        </form>
      )}
      <div>
        <h3>All Activities</h3>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.name} - {activity.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Activities;