import React, { useRef, useState } from "react";
import useClickOutside from "../../Hooks/UseClickOutside";

let nextId = 0;
const jobStatus = ["unassigned", "assigned", "started", "complete", "blocked"];

const JobForm = ({ jobsState, setJobsState, botsState, job, handleDeleteJob, onSuccess }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [requiredBots, setRequiredBots] = useState(job ? job.requiredBots : []);

  const wrapperRef = useRef("jobOptions");

  const handleJobForm = (event, callback) => {
    event.preventDefault();
    const jobName = event.target.querySelector("#jobName");
    const jobDescription = event.target.querySelector("#jobDescription");
    const jobStatus = event.target.querySelector("#jobStatus");

    const jobs = job ? jobsState.filter((a) => a.id !== job.id) : jobsState;
    if (jobs.map((b) => b.name.toLowerCase()).includes(jobName.value.toLowerCase())) {
      alert("Duplicate Job Name!");
      return false;
    } else {
      setJobsState(callback(jobName, jobDescription, jobStatus));
    }
    onSuccess();
  };

  function addJob(jobName, jobDescription, jobStatus) {
    return [
      ...jobsState,
      {
        id: nextId++,
        name: jobName.value,
        description: jobDescription.value,
        requiredBots: requiredBots,
        status: jobStatus.value,
      },
    ];
  }

  function editJob(jobName, jobDescription, jobStatus) {
    return jobsState.map((b) =>
      b.id === job.id
        ? {
            ...b,
            name: jobName.value,
            description: jobDescription.value,
            requiredBots: requiredBots,
            status: jobStatus.value,
          }
        : b,
    );
  }

  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

  const handleStatusCheckboxChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      if (!requiredBots.includes(event.target.value)) {
        setRequiredBots([...requiredBots, event.target.value]);
      }
    } else {
      setRequiredBots(requiredBots.filter((filter) => filter !== event.target.value));
    }
  };

  function capitalize(s) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }

  return (
    <div className="job-form-container">
      <div className="modal-header">
        <h2>Add New Job</h2>
        {job && (
          <button className="button danger" onClick={() => handleDeleteJob(job, onSuccess)}>
            Delete
          </button>
        )}
      </div>
      <form
        className="job-form"
        onSubmit={
          job ? (event) => handleJobForm(event, editJob) : (event) => handleJobForm(event, addJob)
        }
      >
        <div className="form-inputs">
          <div className="form-group">
            <label htmlFor="jobName">Job Name:</label>
            <input
              type="text"
              placeholder="Enter the job"
              id="jobName"
              defaultValue={job ? job.name : ""}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requiredBots">Add Required Bots:</label>
            <div className="dropdown-check-list" ref={wrapperRef} id="requiredBots">
              <span className="anchor" onClick={() => setOptionsOpen(!optionsOpen)}>
                Select required bots...
              </span>
              {optionsOpen && (
                <ul className="items">
                  {botsState.map((bot) => (
                    <li key={bot.id}>
                      <input
                        type="checkbox"
                        id={`checkbox-${bot.id}`}
                        name={`checkbox-${bot.id}`}
                        value={bot.name}
                        checked={requiredBots.includes(bot.name)}
                        onChange={handleStatusCheckboxChange}
                      />
                      <label htmlFor={`checkbox-${bot.id}`}>{capitalize(bot.name)}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Job Description:</label>
            <textarea
              placeholder="Enter job description"
              id="jobDescription"
              defaultValue={job ? job.description : ""}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobStatus">Set Job Status:</label>
            <select
              className="job-status"
              id="jobStatus"
              defaultValue={job ? job.status : ""}
              required
            >
              <option value="" disabled>
                Select job status...
              </option>
              {jobStatus.map((status, index) => (
                <option key={index} value={status}>
                  {capitalize(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="button success">
          {job ? "Save Bot" : "Add Bot"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
