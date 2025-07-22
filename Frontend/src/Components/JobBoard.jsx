import React from "react";
import JobForm from "./Forms/JobForm";
import Modal from "./Modal";

const JobBoard = ({ botsState, jobsState, setJobsState }) => {
  const handleDeleteJob = (job, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    if (confirm) {
      setJobsState((jobsState) => jobsState.filter((a) => a.id !== job.id));
      closeModal();
    }
  };

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
          <JobForm
            jobsState={jobsState}
            setJobsState={setJobsState}
            botsState={botsState}
            job={null}
            handleDeleteJob={null}
          />
        </Modal>
      </div>
      <p>{getJobMessage()}</p>
      {jobsState.map((job) => (
        <div key={job.id} className="job">
          <div className="job-info">
            <h4>{job.name}</h4>
            <p>{job.description}</p>
            <ul>
              {job.requiredBots.split(",").map((skill) => (
                <div key={skill}>
                  <li>{skill}</li>
                </div>
              ))}
            </ul>
            <div className="status-container">
              <div className="status">
                <span className={"status-ball " + job.status}></span>
                {capitalize(job.status)}
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
                setJobsState={setJobsState}
                botsState={botsState}
                job={job}
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
