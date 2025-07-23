import React, { useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import JobForm from "../Components/Forms/JobForm";
import JobColumn from "../Components/JobColumn";
import DynamicTextInput from "../Components/DynamicTextInput";

const Jobs = () => {
  const { botsState, jobsState, setJobsState, setNewJob } = useOutletContext();
  const [unassigned, setUnassigned] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [started, setStarted] = useState([]);
  const [complete, setComplete] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dragRef = useRef(null);

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
    <div className="jobs-page-body">
      <h1>Jobs Management</h1>
      <div className="job-form-wrapper">
        <JobForm
          jobsState={jobsState}
          setJobsState={setJobsState}
          botsState={botsState}
          setNewJob={setNewJob}
        />
      </div>
      <div className="jobs-wrapper">
        <div className="job-search">
          <div className="job-search-input">
            <DynamicTextInput
              textInput={searchText}
              setTextInput={setSearchText}
              placeholder={"Search Jobs..."}
              required={false}
            />
          </div>
        </div>
        <div className="job-column-wrapper">
          {statusListStates.map(([jobStatus, statusList, setStatusList]) => (
            <JobColumn
              key={jobStatus}
              jobStatus={jobStatus}
              statusList={statusList}
              setStatusList={setStatusList}
              jobsState={jobsState}
              setJobsState={setJobsState}
              searchText={searchText}
              dragRef={dragRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
