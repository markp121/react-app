import React, { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "../Hooks/UseClickOutside";
import Modal from "../Components/Modal";
import NewBotForm from "./Forms/NewBotForm";
import EditBotForm from "./Forms/EditBotForm";
import DynamicTextInput from "./DynamicTextInput";

const statuses = ["running", "stopped", "completed"];

const BotListManager = ({ bots }) => {
  const [botsState, setBotsState] = useState(bots);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [statusFilter, setStatusFilter] = useState(statuses);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const timeoutRef = useRef(null);
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

  const handleRemoveBot = (index) => {
    setDisplayedBots((displayedBots) => [
      ...displayedBots.slice(0, index),
      ...displayedBots.slice(index + 1),
    ]);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleChangeBotStatus = (event, index) => {
    if (displayedBots[index].status.toLowerCase() === "running") {
      stopBot(event, index);
    } else if (displayedBots[index].status.toLowerCase() === "stopped") {
      startBot(event, index);
    } else if (displayedBots[index].status.toLowerCase() === "completed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        startBot(event, index);
      }
    }
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
      botsState.filter((bot) =>
        displayedBots.map((displayedBot) => displayedBot.id).includes(bot.id),
      ),
    );
  }, [botsState]);

  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

  function startBot(event, index) {
    updateBotStatus(index, "Running");
    event.target.innerText = "Stop Bot";
    timeoutRef.current = setTimeout(
      () => {
        updateBotStatus(index, "Completed");
        event.target.innerText = "Start Bot";
      },
      getRandomArbitrary(4000, 10000),
    );
  }

  function stopBot(event, index) {
    updateBotStatus(index, "Stopped");
    event.target.innerText = "Start Bot";
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  function updateBotStatus(index, value) {
    setDisplayedBots((displayedBots) => [
      ...displayedBots.slice(0, index),
      { ...displayedBots[index], status: value },
      ...displayedBots.slice(index + 1),
    ]);
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
        <Modal
          deps={botsState}
          openButtonClass={"button-neutral"}
          openButtonInnerHtml={"Create"}
          modalContent={<NewBotForm botsState={botsState} setBotsState={setBotsState} />}
        />
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
          <button type="submit" className="button-neutral">
            Add Bot
          </button>
        </form>
        <div className="options-container" ref={wrapperRef}>
          <button
            id="optionsToggle"
            type="button"
            className="button-neutral"
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
          <li key={index} className="bot-list-item">
            <div>
              <h3>{bot.name}</h3>
              <p>{bot.task}</p>
              <div className="status-container">
                <div className="status">
                  <span className={"status-ball " + bot.status.toLowerCase()}></span>
                  {bot.status}
                </div>
                <button
                  className="button-neutral"
                  onClick={(event) => handleChangeBotStatus(event, index)}
                >
                  Start Bot
                </button>
              </div>
            </div>
            <div className="bot-list-item-buttons">
              <button className="icon-button remove" onClick={() => handleRemoveBot(index)}>
                <i className="bi bi-x"></i>
              </button>
              <Modal
                deps={botsState}
                openButtonClass={"icon-button edit"}
                openButtonInnerHtml={<i className="bi bi-pencil-square"></i>}
                modalContent={
                  <EditBotForm botsState={botsState} setBotsState={setBotsState} botListItem={bot} />
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
