const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

// User API
const registerUser = async (
  username, 
  password, 
  setToken, 
  setMessage,
  setSuccess,
  setUser) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    const result = await response.json();
    if (result.token) {
      setSuccess(true)
      setUser(result.user.username)
    }
    setToken(result.token);
    setMessage(result.message);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const login = async (username, password, setToken, setMessage, setSuccess, setUser) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const result = await response.json();
    console.log(result);
    if (result.token) {
      setSuccess(true)
      setUser(result.user.username)
    }
    setToken(result.token);
    setMessage(result.message);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const fetchUserData = async (token, setUsername) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();
    setUsername(result.username);
    return result;
  } catch (err) {
    console.error("Couldn't fetch user data", err);
  }
};

const fetchRoutinesByUsername = async (username, token, setRoutines) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (typeof token === 'string' && token.trim() !== '') {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers,
    });
    const result = await response.json();
    setRoutines(result);
    return result;
  } catch (error) {
    console.error("Error fetching routines by creator", error);
    throw error;
  }
};

// Activities API
const fetchActivities = async (setActivities) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (setActivities){
      setActivities(result)
    } else {
      return result;
    }
  } catch (err) {
    console.error("No Activities Available", err);
  }
};

const makeActivities = async (token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        description: description
      }) 
    });

    const result = await response.json();

    console.log(result);
    return result;
  } catch (err) {
    console.error("Error creating activity", err);
  }
};

const updateActivities = async (token, activityId, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description
      }) 
    });

    const result = await response.json();

    console.log(result);
    return result;
  } catch (err) {
    console.error("Failed to update activities", err);
  }
};

const fetchPublicRoutinesByActivityId = async (activityId) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};

// Routines API
const fetchPublicRoutines = async (setRoutines) => {
  try {
  const response = await fetch(`${BASE_URL}/routines`, {
    headers: {
    'Content-Type': 'application/json',
    },
  });
  
  const result = await response.json();
  setRoutines(result);
  } catch (err) {
  console.error(err);
  }
};

const makeRoutines = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error("Error creating routine", err);
  }
};

const updateRoutines = async (routineId, token, name, goal) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};

const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error("Failed to delete routine", err);
  }
};

const attachActivityToRoutine = async (routineId, activityId, count, duration) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        count: count, 
        duration: duration
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error("Error attaching activity to routine", err);
  }
};

const updateRoutineActivity = async (routineActivityId, token, count, duration) => {
  try {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        count: count,
        duration: duration
      })
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Failed to update routine activity", err);
  }
};

const deleteRoutineActivity = async (routineActivityId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: {  
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Failed to delete routine activity", err);
  }
};

export {
  fetchPublicRoutines, 
  login, 
  registerUser, 
  fetchUserData, 
  fetchActivities,
  makeActivities,
  updateActivities,
  fetchRoutinesByUsername,
  fetchPublicRoutinesByActivityId,
  makeRoutines,
  updateRoutines,
  deleteRoutine,
  attachActivityToRoutine,
  updateRoutineActivity,
  deleteRoutineActivity
};