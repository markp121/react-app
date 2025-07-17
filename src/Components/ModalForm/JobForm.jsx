import React, { useRef, useState } from "react";
import useClickOutside from "../../Hooks/UseClickOutside";

let nextId = 0;
const jobStatus = ["unassigned", "assigned", "started", "complete", "blocked"];

const JobForm = ({ jobsState, setJobsState, botsState, onSuccess }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [requiredBots, setRequiredBots] = useState([]);

  const wrapperRef = useRef("jobOptions");

  const handleNewJob = (event) => {
    event.preventDefault();
    const jobName = event.target.querySelector("#jobName");
    const jobDescription = event.target.querySelector("#jobDescription");
    const jobStatus = event.target.querySelector("#jobStatus");

    setJobsState([
      ...jobsState,
      {
        id: nextId++,
        name: jobName.value,
        description: jobDescription.value,
        requiredBots: requiredBots,
        status: jobStatus.value,
      },
    ]);
    onSuccess();
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

  function capitalize(s) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }

  return (
    <div className="job-form-container">
      <h3>Add New Job</h3>
      <form className="job-form" onSubmit={handleNewJob}>
        <div className="form-inputs">
          <div className="form-group">
            <label htmlFor="jobName">Job Name:</label>
            <input type="text" placeholder="Enter the job" id="jobName" required />
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
            <textarea placeholder="Enter job description" id="jobDescription" required />
          </div>
          <div className="form-group">
            <label htmlFor="jobStatus">Set Job Status:</label>
            <select className="job-status" id="jobStatus" defaultValue="" required>
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
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
