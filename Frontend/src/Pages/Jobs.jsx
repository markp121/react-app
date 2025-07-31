import React, { useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import JobForm from "../Components/Forms/JobForm";
import JobColumn from "../Components/JobColumn";
import DynamicTextInput from "../Components/DynamicTextInput";
import useClickOutside from "../Hooks/UseClickOutside";
import { handleMultiSelect, handleToggleAll } from "../EventHandlers/multiSelect";

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

  const botList = useMemo(() => {
    return botsState.map((a) => a.name).concat(["none"]);
  })

  const columnListStates = useMemo(() => {
    return [
      [unassignedList, setUnassignedList, "unassigned"],
      [assignedList, setAssignedList, "assigned"],
      [startedList, setStartedList, "started"],
      [completeList, setCompleteList, "complete"],
      [blockedList, setBlockedList, "blocked"],
    ];
  }, [unassignedList, assignedList, startedList, completeList, blockedList]);

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
              <div className="options-popup">
                <div className="options-reset">
                  <input
                    type="checkbox"
                    id="checkbox-all"
                    name="checkbox-all"
                    onChange={(e) => handleToggleAll(e, botList, setBotsFilter)}
                    checked={botsFilter.length === botList.length}
                  />
                  <label htmlFor="checkbox-all">Select All</label>
                </div>
                <ul className="options-checkboxes">
                  {botsState.map((bot) => (
                    <li key={bot.id}>
                      <input
                        type="checkbox"
                        id={`checkbox-${bot.id}`}
                        name={`checkbox-${bot.id}`}
                        value={bot.name}
                        checked={botsFilter.includes(bot.name)}
                        onChange={(e) => handleMultiSelect(e, botsFilter, setBotsFilter)}
                      />
                      <label htmlFor={`checkbox-${bot.id}`}>{bot.name}</label>
                    </li>
                  ))}
                  <li>
                    <input
                      type="checkbox"
                      id="checkbox-none"
                      name="checkbox-none"
                      value="none"
                      checked={botsFilter.includes("none")}
                      onChange={(e) => handleMultiSelect(e, botsFilter, setBotsFilter)}
                    />
                    <label htmlFor={`checkbox-none`}>No bots</label>
                  </li>
                </ul>
              </div>
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
