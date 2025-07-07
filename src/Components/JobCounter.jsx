import React, { useState } from "react";

const JobCounter = () => {
  const [env, setEnv] = useState("Production");
  const [jobCount, setJobCount] = useState(0);
  const [message, setMessage] = useState(
    `No jobs available in ${env} environment.`,
  );
  let nextCount = jobCount;
  let newEnv = env;

  const handleAddJob = () => {
    nextCount = jobCount + 1;
    setJobCount(nextCount);
    displayMessage(nextCount);
  };

  const handleRemoveJob = () => {
    nextCount = jobCount - 1;
    if (nextCount < 0) {
      return displayMessage(nextCount);
    } else {
      setJobCount(nextCount);
    }
    displayMessage(nextCount);
  };

  const handleClearJobs = () => {
    nextCount = 0;
    setJobCount(nextCount);
    displayMessage(nextCount);
  };

  const handleToggleEnv = () => {
    newEnv = env === "Production" ? "UAT" : "Production";
    setEnv(newEnv);
    displayMessage();
  };

  const displayMessage = () => {
    if (nextCount === 0) {
      setMessage(`No jobs available in ${newEnv} environment.`);
    } else if (nextCount > 0 && nextCount <= 5) {
      setMessage(`Few jobs available ${newEnv} environment.`);
    } else if (nextCount > 5) {
      setMessage(`Many jobs available ${newEnv} environment.`);
    } else if (nextCount < 0) {
      setMessage("Cannot have negative Jobs!");
    }
  };

  return (
    <div className="job-counter-container">
      <h2>Job Counter</h2>
      <p>Current Jobs: {jobCount}</p>
      <div className="job-counter-buttons">
        <button className="button-neutral" onClick={handleAddJob}>Add Job</button>
        <button className="button-neutral" onClick={handleRemoveJob}>Remove Job</button>
        <button className="button-neutral" onClick={handleClearJobs}>Clear Jobs</button>
        <button className="button-neutral" onClick={handleToggleEnv}>Toggle Environment</button>
      </div>
      <h3>{message}</h3>
    </div>
  );
};

export default JobCounter;
