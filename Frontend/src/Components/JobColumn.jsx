import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import JobForm from "./Forms/JobForm";
import { Link, useOutletContext } from "react-router-dom";

const JobColumn = ({ columnListState, searchText, dragRef }) => {
  const { jobsState, botsState, setUpdatedJob, setDraggedJob, updatedJobIdRef, handleDeleteJob } =
    useOutletContext();

  const [emptyList, setEmptyList] = useState(true);
  const [columnList, setColumnList, columnStatus] = columnListState;

  useEffect(() => {
    setColumnList(jobsState.filter((job) => job.status === columnStatus));
  }, [setColumnList, jobsState, columnStatus]);

  const filteredJobsList = useMemo(() => {
    return columnList.filter((statusListItem) =>
      statusListItem.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, columnList]);

  useEffect(() => {
    if (filteredJobsList.length > 0) {
      setEmptyList(false);
    } else {
      setEmptyList(true);
    }
  }, [filteredJobsList]);

  const handleDrop = (event) => {
    event.preventDefault();
    setJobStatus(dragRef.current);
    event.target.classList.remove("dragover");
  };

  function setJobStatus(jobId) {
    updatedJobIdRef.current = jobId;
    const currentJob = jobsState.filter((job) => job.id === jobId)[0];
    setDraggedJob({ ...currentJob, status: columnStatus });
  }

  return (
    <div className="job-column">
      <h2>{columnStatus}</h2>
      <div
        className="job-colum-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.target.classList.add("dragover")}
        onDragLeave={(e) => e.target.classList.remove("dragover")}
        onDrop={handleDrop}
      >
        <ul className="job-column-list">
          {emptyList && (
            <p className="placeholder-message">There are no {columnStatus} jobs scheduled.</p>
          )}
          {filteredJobsList.map((job) => (
            <li
              className={`job-column-list-item ${job.status}`}
              key={job.id}
              draggable="true"
              onDrag={() => {
                dragRef.current = job.id;
              }}
            >
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
              <Link to={`/jobs/${job.id}`} state={{job: job}} className="job-link"></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobColumn;
