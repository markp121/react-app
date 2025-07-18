import React, { useEffect, useMemo, useState } from "react";

const JobColumn = ({ jobStatus, statusList, setStatusList, jobsState, searchText }) => {
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
    }
  }, [filteredJobsList]);

  return (
    <div className="job-column">
      <h2>{jobStatus}</h2>
      <ul className="job-column-list">
        {emptyList && (
            <p className="placeholder-message">There are no {jobStatus} jobs scheduled.</p>
        )}
        {filteredJobsList.map((job) => (
          <li className={`job-column-list-item ${job.status}`} key={job.id}>
            <div className="job-info">
              <h4>{job.name}</h4>
              <p>{job.description}</p>
              <ul>
                {job.requiredBots.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobColumn;
