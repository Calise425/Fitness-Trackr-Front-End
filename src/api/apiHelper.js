const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/";


const registerUser = async (
  name, 
  pass, 
  setToken, 
  setSuccess, 
  setError) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: name,
          password: pass,
        },
      }),
    });
    const result = await response.json();
    if (!result.success) {
      setError(result.error.message);
    } else {
      setToken(result.data.token);
      if (result.data.token) {
        setLoggedIn(true);
        setSuccess(true);
      }
    }
    return result;
  } catch (err) {
    console.error(err);
  }
};

const login = async (username, password, setToken, setSuccess, setError) => {
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
    if (!result.success) {
      setError(result.error.message);
    } else {
      setLoggedIn(true);
      setSuccess(true);
      setToken(result.data.token);
    }
    return result;
  } catch (err) {
    console.error(err);
  }
};

const fetchPublicRoutines = async (setRoutines) => {
  try {
  const response = await fetch(`${BASE_URL}/routines`, {
    headers: {
    'Content-Type': 'application/json',
    },
  });
  
  const result = await response.json();
  console.log(result);
  setRoutines(result);
  } catch (err) {
  console.error(err);
  }
};

const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Couldn't fetch user data", err);
  }
};

const fetchRoutinesbyUsername = async (username, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const fetchActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    console.log(result);
    return result;
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

const updateActivities = async (token, name, description) => {
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


export {
  fetchPublicRoutines, 
  login, 
  registerUser, 
  fetchUserData, 
  fetchActivities,
  makeActivities,
  updateActivities
};