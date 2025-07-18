import React, {useEffect, useMemo} from "react";

const JobColumn = ({ jobStatus, statusList, setStatusList, jobsState, searchText }) => {
  useEffect(() => {
    setStatusList(jobsState.filter((job) => job.status === jobStatus));
  }, [setStatusList, jobsState, jobStatus]);

    const filteredJobsList = useMemo(() => {
        return statusList.filter(
            (statusListItem) =>
                statusListItem.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [searchText, statusList]);

  return (
    <div className="job-column">
      <h2>{jobStatus}</h2>
      <ul className="job-list">
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
