import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../Hooks/HandleClickOutside";
import Modal from "../Components/Modal";
import NewBotForm from "./Forms/NewBotForm";
import EditBotForm from "./Forms/EditBotForm";

const statuses = ["running", "stopped", "completed"];

const BotListManager = () => {
  const [bots, setBots] = useState([
    {
      id: 0,
      name: "Email Extractor",
      task: "Extracting emails",
      status: "Stopped",
    },
    {
      id: 1,
      name: "Notification Sender",
      task: "Sending notifications",
      status: "Stopped",
    },
    {
      id: 2,
      name: "Data Analyzer",
      task: "Analyzing data",
      status: "Stopped",
    },
    {
      id: 3,
      name: "Page Crawler",
      task: "Crawl pages for relevant text",
      status: "Stopped",
    },
    {
      id: 4,
      name: "Automated UI Tester",
      task: "Execute test on application front-end",
      status: "Stopped",
    },
    {
      id: 5,
      name: "Automated API Tester",
      task: "Automated test of API calls",
      status: "Stopped",
    },
    {
      id: 6,
      name: "Page Load Tester",
      task: "Tracks performance of app page loads",
      status: "Stopped",
    },
  ]);

  const [botList, setBotList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statusFilter, setStatusFilter] = useState(statuses);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const timeoutRef = useRef(null);
  const wrapperRef = useRef("filterOptions");

  const handleSubmitBotForm = (event) => {
    event.preventDefault();
    const addBotElement = document.getElementById("addBot");
    setBotList([...botList, bots.filter((bot) => bot.name === addBotElement.value)[0]]);
    addBotElement.value = "";
  };

  const handleRemoveBot = (index) => {
    setBotList((s) => [
      ...s.slice(0, index),
      ...s.slice(index + 1),
    ]);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleChangeJobStatus = (event, index) => {
    if (botList[index].status.toLowerCase() === "running") {
      stopBot(event, index);
    } else if (botList[index].status.toLowerCase() === "stopped") {
      startBot(event, index);
    } else if (botList[index].status.toLowerCase() === "completed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        startBot(event, index);
      }
    }
  };

  const handleStatusFilter = (event) => {
    const checked = event.target.checked;
    if (checked) {
      if (!statusFilter.includes(event.target.value)) {
        setStatusFilter([...statusFilter, event.target.value]);
      }
    } else {
      setStatusFilter(statusFilter.filter((filter) => filter !== event.target.value));
    }
  };

  useEffect(() => {
    const filteredBotList = botList.filter((bot) =>
      statusFilter.includes(bot.status.toLowerCase()),
    );
    setFilteredList(filteredBotList);
  }, [botList, statusFilter]);

  useEffect(() => {
    const updatedBotList = bots.filter((bot) => botList.map((bot) => bot.id).includes(bot.id));
    setBotList(updatedBotList);
  }, [bots]);


  useClickOutside(wrapperRef, () => {
    setOptionsOpen(false);
  });

  function startBot(event, index) {
    updateObj(index, "status", "Running");
    event.target.innerText = "Stop Bot";
    timeoutRef.current = setTimeout(
      () => {
        updateObj(index, "status", "Completed");
        event.target.innerText = "Start Bot";
      },
      getRandomArbitrary(4000, 10000),
    );
  }

  function stopBot(event, index) {
    updateObj(index, "status", "Stopped");
    event.target.innerText = "Start Bot";
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  function updateObj(index, key, value) {
    setBotList((s) => [
      ...s.slice(0, index),
      { ...s[index], [key]: value },
      ...s.slice(index + 1),
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
          deps={bots}
          openButtonClass={"button-neutral"}
          openButtonInnerHtml={"Create"}
          modalContent={<NewBotForm bots={bots} setBots={setBots} />}
        />
      </div>
      <div className="dropdown-form-container">
        <form onSubmit={handleSubmitBotForm}>
          <label htmlFor="addBot">Add a new bot:</label>
          <select defaultValue="" name="bots" id="addBot" required>
            <option value="" disabled>
              Select Bot...
            </option>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.name}>
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
                    onChange={handleStatusFilter}
                  />
                  <label htmlFor={`checkbox-${status}`}>{capitalize(status)}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ul>
        {filteredList.map((bot, index) => (
          <li key={index} className="list-item-bot">
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
                  onClick={(event) => handleChangeJobStatus(event, index)}
                >
                  Start Bot
                </button>
              </div>
            </div>
            <div className="list-item-buttons">
              <button className="icon-button remove" onClick={() => handleRemoveBot(index)}>
                <i className="bi bi-x"></i>
              </button>
              <Modal
                deps={bots}
                openButtonClass={"icon-button edit"}
                openButtonInnerHtml={<i className="bi bi-pencil-square"></i>}
                modalContent={<EditBotForm bots={bots} setBots={setBots} botListItem={bot} />}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
