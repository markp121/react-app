import React, { useEffect, useMemo, useState } from "react";

const JobColumn = ({ jobStatus, statusList, setStatusList, jobsState, setJobsState, dragRef, searchText }) => {
  const [emptyList, setEmptyList] = useState(true);

  useEffect(() => {
    setStatusList(jobsState.filter((job) => job.status === jobStatus));
  }, [setStatusList, jobsState, jobStatus]);

  const filteredJobsList = useMemo(() => {
    return statusList.filter((statusListItem) =>
      statusListItem.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, statusList]);

  useEffect(() => {
    if (filteredJobsList.length > 0) {
      setEmptyList(false);
    } else {
      setEmptyList(true);
    }
  }, [filteredJobsList]);

  function setJobStatus(jobId) {
    return setJobsState(
      jobsState.map((b) =>
        b.id === jobId
          ? {
              ...b,
              status: jobStatus,
            }
          : b,
      ),
    );
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    setJobStatus(dragRef.current);
  };

  return (
    <div className="job-column">
      <h2>{jobStatus}</h2>
      <div className="job-colum-dropzone" onDragOver={handleDragOver}>
        <ul className="job-column-list">
          {emptyList && (
            <p className="placeholder-message">There are no {jobStatus} jobs scheduled.</p>
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
                <ul>
                  {job.requiredBots.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobColumn;
