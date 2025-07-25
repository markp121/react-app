import React, { useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import JobForm from "../Components/Forms/JobForm";
import JobColumn from "../Components/JobColumn";
import DynamicTextInput from "../Components/DynamicTextInput";

const Jobs = () => {
  const { jobsState, botsState, setNewJob, setDraggedJob, updatedJobIdRef } = useOutletContext();

  const [unassignedList, setUnassignedList] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [startedList, setStartedList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dragRef = useRef(null);

  const columnListStates = useMemo(() => {
    return [
      [unassignedList, setUnassignedList, "unassigned"],
      [assignedList, setAssignedList, "assigned"],
      [startedList, setStartedList, "started"],
      [completeList, setCompleteList, "complete"],
      [blockedList, setBlockedList, "blocked"],
    ];
  }, [unassignedList, assignedList, startedList, completeList, blockedList]);

  return (
    <div className="jobs-page-body">
      <h1>Jobs Management</h1>
      <div className="job-form-wrapper">
        <JobForm jobsState={jobsState} botsState={botsState} setChangedJobState={setNewJob} />
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
          {columnListStates.map((columnListState, index) => (
            <JobColumn
              columnListState={columnListState}
              jobsState={jobsState}
              setDraggedJob={setDraggedJob}
              updatedJobIdRef={updatedJobIdRef}
              searchText={searchText}
              dragRef={dragRef}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
