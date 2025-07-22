import React, { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "../Hooks/UseClickOutside";
import Modal from "./Modal";
import NewBotForm from "./Forms/NewBotForm";
import DynamicTextInput from "./DynamicTextInput";
import BotListItem from "./BotListItem";

const statuses = ["running", "stopped", "completed", "failed"];
let listId = 0;

const BotListManager = ({ botsState, setBotsState }) => {
  const [botList, setBotList] = useState([]);
  const [statusFilter, setStatusFilter] = useState(statuses);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const wrapperRef = useRef("filterOptions");

  const handleAddBotForm = (event) => {
    event.preventDefault();
    const addBotElement = event.target.querySelector("#addBot");
    setBotList([
      ...botList,
      Object.assign({}, botsState.filter((bot) => bot.name === addBotElement.value)[0], {
        listId: listId++,
      }),
    ]);
    addBotElement.value = "";
  };

  const handleStatusCheckboxChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      if (!statusFilter.includes(event.target.value)) {
        setStatusFilter([...statusFilter, event.target.value]);
      }
    } else {
      setStatusFilter(statusFilter.filter((filter) => filter !== event.target.value));
    }
  };

  const filteredBotList = useMemo(() => {
    return botList.filter(
      (botListItem) =>
        statusFilter.includes(botListItem.status.toLowerCase()) &&
        botListItem.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [botList, statusFilter, searchText]);

  useEffect(() => {
    setBotList((botList) =>
      botList.filter((botListItem) => botsState.map((bot) => bot.id).includes(botListItem.id)),
    );
  }, [botsState]);

  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

  function executeBotTask(timeoutRef, callback) {
    function botTask() {
      return new Promise((resolve, reject) => {
        timeoutRef.current = setTimeout(
          () => {
            const success = Math.random() < 0.8;
            success ? resolve("Completed") : reject("Failed");
          },
          getRandomArbitrary(4000, 8000),
        );
      });
    }
    botTask().then(
      (resolve) => callback(resolve),
      (reject) => callback(reject),
    );
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function capitalize(s) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }

  return (
    <div className="bot-list-manager">
      <div className="bot-list-header">
        <h2>Bot List Manager</h2>
        <Modal openButtonClass={"button neutral"} openButtonInnerHtml={"Create"}>
          <NewBotForm botsState={botsState} setBotsState={setBotsState} />
        </Modal>
      </div>
      <div className="bot-list-search">
        <DynamicTextInput
          textInput={searchText}
          setTextInput={setSearchText}
          placeholder={"Search bots..."}
          required={false}
        />
      </div>
      <div className="bot-list-add">
        <form onSubmit={handleAddBotForm}>
          <label htmlFor="addBot">Add a new bot:</label>
          <select defaultValue="" name="bots" id="addBot" required>
            <option value="" disabled>
              Select Bot...
            </option>
            {botsState.map((bot) => (
              <option key={bot.id} value={bot.name}>
                {bot.name}
              </option>
            ))}
          </select>
          <button type="submit" className="button success">
            Add Bot
          </button>
        </form>
        <div className="options-container" ref={wrapperRef}>
          <button
            id="optionsToggle"
            type="button"
            className="button neutral"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
          {optionsOpen && (
            <ul id="optionsCheckboxes">
              {statuses.map((status, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`checkbox-${status}`}
                    name={`checkbox-${status}`}
                    value={status}
                    checked={statusFilter.includes(status)}
                    onChange={handleStatusCheckboxChange}
                  />
                  <label htmlFor={`checkbox-${status}`}>{capitalize(status)}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ul>
        {filteredBotList.map((filteredBotListItem) => (
          <BotListItem
            botListItem={filteredBotListItem}
            botsState={botsState}
            setBotsState={setBotsState}
            setBotList={setBotList}
            executeBotTask={executeBotTask}
            key={filteredBotListItem.listId}
          />
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
