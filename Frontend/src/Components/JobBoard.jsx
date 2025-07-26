import React from "react";
import JobForm from "./Forms/JobForm";
import Modal from "./Modal";

const JobBoard = ({ jobsState, botsState, setNewJob, setUpdatedJob, updatedJobIdRef, handleDeleteJob }) => {
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

  return (
    <div className="job-list">
      <div className="job-list-header">
        <h2>Jobs List</h2>
        <Modal openButtonClass={"button neutral"} openButtonInnerHtml={"Add Job"}>
          <JobForm jobsState={jobsState} botsState={botsState} setChangedJobState={setNewJob} />
        </Modal>
      </div>
      <p>{getJobMessage()}</p>
      {jobsState.map((job) => (
        <div key={job.id} className="job">
          <div className="job-info">
            <h4>{job.name}</h4>
            <p>{job.description}</p>
            {job.Bots.length > 0 ? (
              <ul>
                {job.Bots.map((bot) => (
                  <div key={bot.name}>
                    <li>{bot.name}</li>
                  </div>
                ))}
              </ul>
            ) : (
              <span>No bots required</span>
            )}
            <div className="status-container">
              <div className="status">
                <span className={"status-ball " + job.status}></span>
                {job.status}
              </div>
            </div>
          </div>
          <div className="functional-buttons">
            <Modal
              openButtonClass={"icon-button edit"}
              openButtonInnerHtml={<i className="bi bi-pencil"></i>}
            >
              <JobForm
                jobsState={jobsState}
                botsState={botsState}
                setChangedJobState={setUpdatedJob}
                currentJob={job}
                updatedJobIdRef={updatedJobIdRef}
                handleDeleteJob={handleDeleteJob}
              />
            </Modal>
            <button className="icon-button delete" onClick={() => handleDeleteJob(job)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobBoard;
