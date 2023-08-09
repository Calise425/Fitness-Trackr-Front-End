
const handleAddActivity = async (routineId, activityId, count, duration) => {
  try {
    const result = await attachActivityToRoutine(routineId, activityId, count, duration);
    return result;
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