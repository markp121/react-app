import React, { useEffect } from "react";

const JobColumn = ({ jobStatus, statusList, setStatusList, jobsState }) => {
  useEffect(() => {
    setStatusList(jobsState.filter((job) => job.status === jobStatus));
  }, [setStatusList, jobsState, jobStatus]);

  return (
    <div className="job-column">
      <h2 className="heading-status">{jobStatus}</h2>
      <ul className="job-list">
        {statusList.map((job) => (
          <li className="job" key={job.id}>
            <div className="job-info">
              <h4>{job.name}</h4>
              <p>{job.description}</p>
              <ul>
                {job.requiredBots.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobColumn;
