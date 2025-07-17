import React, { useState } from "react";
import JobForm from "./ModalForm/JobForm";
import Modal from "./Modal";

const JobBoard = ({ botsState }) => {
  const [jobsState, setJobsState] = useState([]);

  const getJobMessage = () => {
    const jobCount = jobsState.length;
    if (jobCount === 0) {
      return "No Jobs Found";
    } else if (jobCount > 0 && jobCount <= 5) {
      return `A few jobs scheduled today: ${jobCount}`;
    } else if (jobCount > 5) {
      return `A lot of jobs scheduled today: ${jobCount}`;
    }
  };

  function capitalize(s) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }

  return (
    <div className="job-list">
      <div className="job-list-header">
        <h2>Jobs List</h2>
        <Modal openButtonClass={"button neutral"} openButtonInnerHtml={"Add Job"}>
          <JobForm jobsState={jobsState} setJobsState={setJobsState} botsState={botsState} />
        </Modal>
      </div>
      <p>{getJobMessage()}</p>
      {jobsState.map((job) => (
        <div key={job.id} className="job">
          <h4>{job.name}</h4>
          <p>{job.description}</p>
          <ul>
            {job.requiredBots.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className="status-container">
            <div className="status">
              <span className={"status-ball " + job.status}></span>
              {capitalize(job.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobBoard;
