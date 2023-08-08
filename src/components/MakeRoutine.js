import React, { useState } from "react";
import { makeRoutines } from "../api/apiHelper";

const CreateRoutine = ({ token }) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("routine submitted!", token, name, goal, isPublic);
        const result = await makeRoutines(token, name, goal, isPublic);
        if (result.id) {
          setSuccess(true);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error creating routine", err);
        setError("Error creating routine. Please try again.");
      }
    };
  
    return success ? (
      <div>
        <h2>Routine created successfully!</h2>
      </div>
    ) : (
      <div className="create-routine-form">
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
          <button>Create Routine</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  };
  
  export default CreateRoutine;
