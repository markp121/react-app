import React, { useEffect, useRef, useState } from "react";

const BotListManager = ({ bots }) => {
  const [botList, setBotList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statusFilter, setStatusFilter] = useState(["running", "stopped", "completed"]);
  const timeoutRef = useRef(null);

  const handleSubmitBotForm = (event) => {
    event.preventDefault();
    const addBotElement = document.getElementById("addBot");
    setBotList([...botList, bots.filter((bot) => bot.name === addBotElement.value)[0]]);
    addBotElement.value = "";
  };

  const handleRemoveBot = (botItem) => {
    setBotList(botList.filter((bot) => bot.id !== botItem.id));
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

  useEffect(() => {
    const filteredBotList = botList.filter((bot) =>
      statusFilter.includes(bot.status.toLowerCase()),
    );
    setFilteredList(filteredBotList);
  }, [botList, statusFilter]);

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

  const toggleOptions = (event) => {
    event.stopPropagation();
    const optionsCheckboxes = document.getElementById("optionsCheckboxes");
    if (optionsCheckboxes.getAttribute("hidden") !== null) {
      optionsCheckboxes.removeAttribute("hidden");
    } else {
      optionsCheckboxes.setAttribute("hidden", "");
    }
  };

  return (
    <div className="bot-list-manager">
      <h2>Bot List Manager</h2>
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
        <div className="options-container">
          <button
            id="optionsToggle"
            type="button"
            className="button-neutral"
            onClick={toggleOptions}
          >
            <i className="bi bi-list"></i>
          </button>
          <ul id="optionsCheckboxes" hidden>
            <li>
              <input
                type="checkbox"
                id="checkboxRunning"
                name="checkboxRunning"
                value="running"
                defaultChecked
                onChange={handleStatusFilter}
              />
              <label htmlFor="checkboxRunning">Running</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="checkboxStopped"
                name="checkboxStopped"
                value="stopped"
                defaultChecked
                onChange={handleStatusFilter}
              />
              <label htmlFor="checkboxStopped">Stopped</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="checkboxCompleted"
                name="checkboxCompleted"
                value="completed"
                defaultChecked
                onChange={handleStatusFilter}
              />
              <label htmlFor="checkboxCompleted">Completed</label>
            </li>
          </ul>
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
            <button className="remove-button" onClick={() => handleRemoveBot(bot)}>
              <i className="bi bi-x"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
