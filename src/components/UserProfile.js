import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  fetchRoutinesByUsername, 
  makeRoutines, 
  updateRoutines, 
  deleteRoutine,
  attachActivityToRoutine,
  updateRoutineActivity,
  deleteRoutineActivity
} from "../api/apiHelper";

const MyRoutines = ({ token, routines, setRoutines }) => {
  const { username } = useParams();
  const [showRoutineForm, setShowRoutineForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateRoutineId, setUpdateRoutineId] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityRoutineId, setActivityRoutineId] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchRoutinesByUsername(username, token, setRoutines);
  }, [username, token]);

  const handleCreateRoutine = async (name, goal) => {
    try {
      const newRoutine = await makeRoutines(name, goal, token);
      setRoutines([...routines, newRoutine]);
      setShowRoutineForm(false);
    } catch (error) {
      console.error("Error creating routine", error);
    }
  };

  const handleUpdateRoutine = async (routineId, name, goal) => {
    try {
      await updateRoutines(routineId, name, goal, token);
      const updatedRoutines = routines.map((routine) => {
        if (routine.id === routineId) {
          return { ...routine, name, goal };
        }
        return routine;
      });
      setRoutines(updatedRoutines);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating routine", error);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    try {
      await deleteRoutine(routineId, token);
      const filteredRoutines = routines.filter((routine) => routine.id !== routineId);
      setRoutines(filteredRoutines);
    } catch (error) {
      console.error("Error deleting routine", error);
    }
  };

  const handleAddActivity = async (routineId, activityId, count, duration) => {
    try {
      await attachActivityToRoutine(routineId, activityId, count, duration);
      const updatedRoutines = routines.map((routine) => {
        if (routine.id === routineId) {
          return {
            ...routine,
            activities: [
              ...routine.activities,
              {
                id: Date.now(),
                activityId,
                count,
                duration,
              },
            ],
          };
        }
        return routine;
      });
      setRoutines(updatedRoutines);
      setShowActivityForm(false);
    } catch (error) {
      console.error("Error attaching activity to routine", error);
    }
  };

  const handleUpdateActivity = async (routineId, routineActivityId, count, duration) => {
    try {
      await updateRoutineActivity(routineActivityId, token, count, duration);
      const updatedRoutines = routines.map((routine) => {
        if (routine.id === routineId) {
          return {
            ...routine,
            activities: routine.activities.map((activity) => {
              if (activity.id === routineActivityId) {
                return { ...activity, count, duration };
              }
              return activity;
            }),
          };
        }
        return routine;
      });
      setRoutines(updatedRoutines);
    } catch (error) {
      console.error("Error updating routine activity", error);
    }
  };

  const handleRemoveActivity = async (routineId, routineActivityId) => {
    try {
      await deleteRoutineActivity(routineActivityId, token);
      const updatedRoutines = routines.map((routine) => {
        if (routine.id === routineId) {
          return {
            ...routine,
            activities: routine.activities.filter((activity) => activity.id !== routineActivityId),
          };
        }
        return routine;
      });
      setRoutines(updatedRoutines);
    } catch (error) {
      console.error("Error removing activity from routine", error);
    }
  };

  return (
    <div className="my-routines">
      <h2>My Routines</h2>
      <button onClick={() => setShowRoutineForm(true)}>Create New Routine</button>
      {showRoutineForm && (
        <RoutineForm onCreate={handleCreateRoutine} onCancel={() => setShowRoutineForm(false)} />
      )}

      {routines.map((routine) => (
        <div key={routine.id} className="routine">
          <h3>{routine.name}</h3>
          <p>Goal: {routine.goal}</p>
          <button onClick={() => setShowUpdateForm(true)}>Update</button>
          <button onClick={() => handleDeleteRoutine(routine.id)}>Delete</button>
          <button onClick={() => setShowActivityForm(true)}>Manage Activities</button>

          {showUpdateForm && updateRoutineId === routine.id && (
            <UpdateRoutineForm
              routine={routine}
              onUpdate={handleUpdateRoutine}
              onCancel={() => setShowUpdateForm(false)}
            />
          )}

          {showActivityForm && activityRoutineId === routine.id && (
            <ActivityForm
              routine={routine}
              activities={activities} // Pass the list of activities fetched from the API
              onAddActivity={handleAddActivity}
              onUpdateActivity={handleUpdateActivity}
              onRemoveActivity={handleRemoveActivity}
              onCancel={() => setShowActivityForm(false)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;





