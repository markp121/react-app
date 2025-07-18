import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import JobForm from "../Components/Forms/JobForm";
import JobColumn from "../Components/JobColumn";

const Jobs = () => {
  const { botsState, jobsState, setJobsState } = useOutletContext();
  const [unassigned, setUnassigned] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [started, setStarted] = useState([]);
  const [complete, setComplete] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const statusListStates = useMemo(() => {
    return [
      ["unassigned", unassigned, setUnassigned],
      ["assigned", assigned, setAssigned],
      ["started", started, setStarted],
      ["complete", complete, setComplete],
      ["blocked", blocked, setBlocked],
    ];
  }, [unassigned, assigned, started, complete, blocked]);

  return (
    <>
      <h1>Jobs Management</h1>
      <div className="job-form-wrapper">
        <JobForm jobsState={jobsState} setJobsState={setJobsState} botsState={botsState} />
      </div>
      <div className="jobs-wrapper">
        {statusListStates.map(([jobStatus, statusList, setStatusList], index) => (
          <JobColumn
            key={index}
            jobStatus={jobStatus}
            statusList={statusList}
            setStatusList={setStatusList}
            jobsState={jobsState}
          />
        ))}
      </div>
    </>
  );
};

export default Jobs;
