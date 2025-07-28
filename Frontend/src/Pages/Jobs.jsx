import React, { useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import JobForm from "../Components/Forms/JobForm";
import JobColumn from "../Components/JobColumn";
import DynamicTextInput from "../Components/DynamicTextInput";
import useClickOutside from "../Hooks/UseClickOutside";
import { multiSelect } from "../Functions/multiSelect";

const Jobs = () => {
  const { jobsState, botsState, setNewJob, botsFilter, setBotsFilter } = useOutletContext();

  const [unassignedList, setUnassignedList] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [startedList, setStartedList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);

  const dragRef = useRef(null);
  const wrapperRef = useRef("filterOptions");

  const columnListStates = useMemo(() => {
    return [
      [unassignedList, setUnassignedList, "unassigned"],
      [assignedList, setAssignedList, "assigned"],
      [startedList, setStartedList, "started"],
      [completeList, setCompleteList, "complete"],
      [blockedList, setBlockedList, "blocked"],
    ];
  }, [unassignedList, assignedList, startedList, completeList, blockedList]);

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    multiSelect(checkboxValue, botsFilter, setBotsFilter);
  };

  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

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
          <div className="options-container" ref={wrapperRef}>
            <button
              type="button"
              className="button neutral options-toggle"
              onClick={() => setOptionsOpen(!optionsOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            {optionsOpen && (
              <ul className="options-checkboxes">
                {botsState.map((bot) => (
                  <li key={bot.id}>
                    <input
                      type="checkbox"
                      id={`checkbox-${bot.id}`}
                      name={`checkbox-${bot.id}`}
                      value={bot.name}
                      checked={botsFilter.includes(bot.name)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`checkbox-${bot.id}`}>{bot.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="job-column-wrapper">
          {columnListStates.map((columnListState, index) => (
            <JobColumn
              columnListState={columnListState}
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
