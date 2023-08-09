import React, { useState, useEffect } from "react";
import { 
  fetchRoutinesByUsername, 
  makeRoutines, 
  updateRoutines, 
  deleteRoutine,
  attachActivityToRoutine,
  updateRoutineActivity,
  deleteRoutineActivity,
  fetchUserData,
  fetchActivities
} from "../api/apiHelper";

const MyRoutines = ({ token, routines, setRoutines }) => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [count, setCount] = useState(1)
  const [duration, setDuration] = useState(10)
  const [error, setError] = useState("");
  const [showRoutineForm, setShowRoutineForm] = useState(false);
  const [update, setUpdate] = useState(false)
  const [routineId, setRoutineId] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activityNames, setActivityNames] = useState([]);
  const [editCount, setEditCount] = useState(0);
  const [editDuration, setEditDuration] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [render, setRender] = useState(true)

  useEffect(() => {
    fetchActivities(setActivities);
  }, [])

  useEffect(() => {
    const names = activities.map(activity => activity.name);
    setActivityNames(names.sort());
  }, [activities]);

  useEffect(() => {
    fetchUserData(token, setUsername);
  }, [token, editMode, render]);

  useEffect(() => {
    if (username) {
      fetchRoutinesByUsername(username, token, setRoutines);
    }
  }, [username, token, showRoutineForm, editCount, editMode, render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!update) {
      try {
        console.log("routine submitted!", token, name, goal, isPublic);
        const result = await makeRoutines(token, name, goal, isPublic);
        if (result.id) {
          setShowRoutineForm(false)
          setUpdate(false);
          setError("")
          setName("");
          setGoal("")
          setRoutineId(null);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error creating routine", err);
        setError("Error creating routine. Please try again.");
      }
    }
    else {
      console.log("UPDATE ROUTINE HAPPENING", token, routineId, name, goal)
      try {
        const result = await updateRoutines(routineId, token, name, goal);
        console.log(result);
        setShowRoutineForm(false);
        setUpdate(false);
        setError("")
        setName("");
        setGoal("")
        setRoutineId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateHandler = (routine) => {
    setShowRoutineForm(!showRoutineForm); 
    setUpdate(!update);
    setGoal(routine.goal);
    setName(routine.name);
    setRoutineId(routine.id);
  }

  const handleDeleteRoutine = async (routineId) => {
    try {
      await deleteRoutine(routineId, token);
      const filteredRoutines = routines.filter((routine) => routine.id !== routineId);
      setRoutines(filteredRoutines);
      setRender(!render);
    } catch (error) {
      console.error("Error deleting routine", error);
    }
  };

  const handleAddActivity = async (routine) => {
    const routineId = routine.id;
    try {
      const result = await attachActivityToRoutine(routineId, activityId, count, duration);
      setRender(!render);
      console.log(result)
    } catch (error) {
      console.error("Error attaching activity to routine", error);
    }
  };

  const handleRemoveActivity = async (routine, activityIndex) => {
    const routineActivityId = routine.activities[activityIndex].routineActivityId;
    try {
      await deleteRoutineActivity(routineActivityId, token);
      setRender(!render);
    } catch (error) {
      console.error("Error removing activity from routine", error);
    }
  };


  const handleEdit = async (activity) => {
    console.log("Editing activity:", activity);
    setEditCount(activity.count);
    setEditDuration(activity.duration);
    setEditMode(true);
    setActivityId(activity.id);
  };
  
  const handleSaveChanges = async (activity) => {
    console.log("Saving changes for activity:", activity);
  
    const routineActivityId = activity.routineActivityId;
    try {
      await updateRoutineActivity(routineActivityId, token, editCount, editDuration);
      console.log("Activity updated in API");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating activity", error);
    }
  };

  return (
    <div className="my-routines">
      <button className = "new-routine-button" onClick={() => setShowRoutineForm(!showRoutineForm)}>Create New Routine</button>
      {/* A form to create a new routine-dependant upon showRoutineForm & update state */}
      {showRoutineForm && (<div className = "routine-header">
        {!update && <h2>Create New Routine</h2>}
        {update && <h2>Update Routine</h2>}
        <div className="create-form">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            placeholder="Enter routine name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Goal:</label>
          <input
            type="text"
            required
            value={goal}
            placeholder="Enter routine goal"
            onChange={(e) => setGoal(e.target.value)}
          />
          <label>Public:</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          {!update && <button>Create Routine</button>}
          {update && <button>Update Routine</button>}
          {error && <p>{error}</p>}
        </form>
      </div>
        <h2>My Routines</h2>
      </div>)}
      {routines.map((routine) => (
        <div key={routine.id} className="routine">
          <h3>{routine.name}</h3>
          <p>Goal: {routine.goal}</p>
          <div className = "activity-add">
            <p>Add an Activity: </p>
            <select onChange={(e) => setActivityId(activities.find(activity => activity.name === e.target.value)?.id)}>
            <option value="none" >Select an Activity</option>
              {activityNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <p>Count:</p>
            <input
              type="number"
              value={count}
              onChange={event => setCount(event.target.value)}
              placeholder="Count"
              className = "number-input"
            />
            <p>Duration:</p>
            <input
              type="number"
              value={duration}
              onChange={event => setDuration(event.target.value)}
              placeholder="Duration (minutes)"
              className = "number-input"
            />
            <button onClick={()=>handleAddActivity(routine)}>Add Activity to Routine</button>
          </div>
          <h3>Activities</h3>
          {routine.activities.map((activity, activityIndex) => (
            <div key={activity.id} className="activities-on-routines">
              <p>
                Name: {activity.name} | Description: {activity.description} | Count: {activity.count} | Duration: {activity.duration}
              </p>

              {editMode && activity.id === activityId && (
                <>
                  <p>Count:</p>
                  <input
                    type="number"
                    value={editCount}
                    onChange={(event) => setEditCount(event.target.value)}
                    placeholder="Count"
                    className="number-input"
                  />
                  <p>Duration:</p>
                  <input
                    type="number"
                    value={editDuration}
                    onChange={(event) => setEditDuration(event.target.value)}
                    placeholder="Duration (minutes)"
                    className="number-input"
                  />
                  <button onClick={() => handleSaveChanges(activity)}>Save Changes</button>
                </>
              )}
              <button onClick={() => handleEdit(activity)}>Edit Activity</button>
              <button onClick={() => handleRemoveActivity(routine, activityIndex)}>Remove Activity From Routine</button>
            </div>
          ))}
          <button onClick={() => updateHandler(routine)}>Update Routine</button>
          <button onClick={() => handleDeleteRoutine(routine.id)}>Delete Routine</button>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;