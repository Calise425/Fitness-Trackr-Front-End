const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/2303-ftb-et-web-pt";

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

export {fetchPublicRoutines}