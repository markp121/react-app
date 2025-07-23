import React, { useRef, useState } from "react";
import useClickOutside from "../../Hooks/UseClickOutside";

const jobStatus = ["unassigned", "assigned", "started", "complete", "blocked"];

const JobForm = ({ jobsState, botsState, setChangedJobState, job, updatedJobIdRef, handleDeleteJob, onSuccess }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [requiredBots, setRequiredBots] = useState(job && job.requiredBots.length > 0 ? job.requiredBots.split(", ") : []);

  const wrapperRef = useRef("jobOptions");

  const handleJobForm = (event) => {
    event.preventDefault();
    const jobName = event.target.querySelector("#jobName");
    const jobDescription = event.target.querySelector("#jobDescription");
    const jobStatus = event.target.querySelector("#jobStatus");

    const jobs = job ? jobsState.filter((a) => a.id !== job.id) : jobsState;
    if (jobs.map((b) => b.name.toLowerCase()).includes(jobName.value.toLowerCase())) {
      alert("Duplicate Job Name!");
      return false;
    } else {
      if (job) updatedJobIdRef.current = job.id;
      setChangedJobState({
        name: jobName.value,
        description: jobDescription.value,
        requiredBots: requiredBots.join(", "),
        status: jobStatus.value,
      });
    }
    if (onSuccess) {
      onSuccess();
    } else {
      jobName.value = "";
      jobDescription.value = "";
      jobStatus.value = "";
      setRequiredBots([]);
    }
  };

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
      <form className="job-form" onSubmit={handleJobForm}>
        <div className="form-inputs">
          <div className="form-group">
            <label htmlFor="jobName">Job Name:</label>
            <input
              type="text"
              placeholder="Enter job name..."
              id="jobName"
              defaultValue={job ? job.name : ""}
              required
            />
          </div>
          <div className="form-group">
            <p className="label">Add Required Bots:</p>
            <div className="dropdown-check-list" ref={wrapperRef} id="requiredBots">
              <span className="anchor" onClick={() => setOptionsOpen(!optionsOpen)}>
                {requiredBots.length > 0
                  ? requiredBots.map((requiredBot, index) => (
                      <span className="required-bot" key={requiredBot}>
                        {requiredBot}
                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            setRequiredBots([
                              ...requiredBots.slice(0, index),
                              ...requiredBots.slice(index + 1),
                            ]);
                          }}
                        >
                          X
                        </span>
                      </span>
                    ))
                  : "Select any required bots..."}
              </span>
              {optionsOpen && (
                <ul className="checkbox-popup">
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
                      <label style={{ textTransform: "capitalize" }} htmlFor={`checkbox-${bot.id}`}>
                        {bot.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Job Description:</label>
            <textarea
              placeholder="Enter job description..."
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
                <option key={index} value={status} style={{ textTransform: "capitalize" }}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="button success">
          {job ? "Save Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
