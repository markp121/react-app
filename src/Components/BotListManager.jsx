import React, { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "../Hooks/UseClickOutside";
import Modal from "./Modal";
import NewBotForm from "./Forms/NewBotForm";
import DynamicTextInput from "./DynamicTextInput";
import BotListItem from "./BotListItem";

const statuses = ["running", "stopped", "completed"];

const BotListManager = ({ bots }) => {
  const [botsState, setBotsState] = useState(bots);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [statusFilter, setStatusFilter] = useState(statuses);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const wrapperRef = useRef("filterOptions");

  const handleAddBotForm = (event) => {
    event.preventDefault();
    const addBotElement = document.getElementById("addBot");
    setDisplayedBots([
      ...displayedBots,
      botsState.filter((bot) => bot.name === addBotElement.value)[0],
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
    return displayedBots.filter(
      (bot) =>
        statusFilter.includes(bot.status.toLowerCase()) &&
        bot.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [displayedBots, statusFilter, searchText]);

  useEffect(() => {
    setDisplayedBots((displayedBots) =>
      botsState.filter((bot) => displayedBots.map((displayedBot) => displayedBot.id).includes(bot.id),
      ),
    );
  }, [botsState]);

  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

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
            {botsState.map((bot, index) => (
              <option key={index} value={bot.name}>
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
        {filteredBotList.map((bot, index) => (
          <BotListItem
            bot={bot}
            index={index}
            botsState={botsState}
            setBotsState={setBotsState}
            displayedBots={displayedBots}
            setDisplayedBots={setDisplayedBots}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
