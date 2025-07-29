import React, { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "../Hooks/UseClickOutside";
import Modal from "./Modal";
import BotForm from "./Forms/BotForm";
import DynamicTextInput from "./DynamicTextInput";
import BotListItem from "./BotListItem";
import { handleMultiSelect, handleToggleAll } from "../EventHandlers/multiSelect";

const statuses = ["running", "stopped", "completed", "failed"];
let listId = 0;

const BotListManager = ({ botsState, newBot, setNewBot, updatedBot, setUpdatedBot, handleDeleteBot }) => {
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

  return (
    <div className="bot-list-manager">
      <div className="bot-list-header">
        <h2>Bot List Manager</h2>
        <Modal openButtonClass={"button neutral"} openButtonInnerHtml={"Create"}>
          <BotForm botsState={botsState} changedBot={newBot} setChangedBot={setNewBot} />
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
                  onChange={(e) => handleToggleAll(e, statuses, setStatusFilter)}
                  checked={statusFilter.length === statuses.length}
                />
                <label htmlFor="checkbox-all">Select All</label>
              </div>
              <ul className="options-checkboxes">
                {statuses.map((status, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox-${status}`}
                      name={`checkbox-${status}`}
                      value={status}
                      checked={statusFilter.includes(status)}
                      onChange={(e) => handleMultiSelect(e, statusFilter, setStatusFilter)}
                    />
                    <label htmlFor={`checkbox-${status}`}>{status}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ul>
        {filteredBotList.map((filteredBotListItem) => (
          <BotListItem
            botsState={botsState}
            setBotList={setBotList}
            updatedBot={updatedBot}
            setUpdatedBot={setUpdatedBot}
            botListItem={filteredBotListItem}
            executeBotTask={executeBotTask}
            handleDeleteBot={handleDeleteBot}
            key={filteredBotListItem.listId}
          />
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
