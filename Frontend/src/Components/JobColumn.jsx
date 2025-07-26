import React, { useEffect, useMemo, useState } from "react";

const JobColumn = ({
  columnListState,
  jobsState,
  setDraggedJob,
  updatedJobIdRef,
  searchText,
  dragRef,
}) => {
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobColumn;
