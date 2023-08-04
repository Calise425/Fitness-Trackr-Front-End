const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/2303-ftb-et-web-pt";


const registerUser = async (
  name,
  pass,
  setToken,
  setSuccess,
  setError
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: `${name}`,
            password: `${pass}`,
          },
        }),
      }
    );
    const result = await response.json();
    !result.success ? setError(result.error.message) : null;
    setToken(result.data.token);
    result.data.token ? setLoggedIn(true) && setSuccess(true) : null;
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
          username: `${username}`,
          password: `${password}`
      })
    });
    const result = await response.json();
    !result.success ? setError(result.error.message) : null;
    result.data.token ? setLoggedIn(true) && setSuccess(true) : null;
    setToken(result.data.token);
    return result;
  } catch (err) {
    console.error(err);
  }
}


const fetchPublicRoutines = async () => {
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
}

export {fetchPublicRoutines, login, registerUser}