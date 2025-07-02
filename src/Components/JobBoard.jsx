import React from "react";

const JobBoard = ({ jobs }) => {
  const jobCount = jobs.length;

  const getJobMessage = () => {
    if (jobCount === 0) {
      return "Job No Jobs Found";
    } else if (jobCount > 0 && jobCount <= 5) {
      return `A few jobs scheduled today: ${jobCount}`;
    } else if (jobCount > 5) {
      return `A lot of jobs scheduled today: ${jobCount}`;
    }
  };

  return (
    <div className="job-list">
      <div className="job-list-header">
        <h2>Jobs List</h2>
        <p>{getJobMessage()}</p>
      </div>
      {jobs.map((job) => (
        <div key={job.id} className="job">
          <h3>{job.companyName}</h3>
          <h4>{job.jobName}</h4>
          <p>{job.description}</p>
          <ul>
            {job.requiredSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className="status-container">
            <div className="status">
              <span className={"status-ball " + job.status.toLowerCase()}></span>
              {job.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobBoard;
