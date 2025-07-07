import React, { useRef, useState } from "react";

const BotListManager = ({ bots }) => {
  const [botList, setBotList] = useState([]);
  const [buttonText, setButtonText] = useState("Start Bot");
  const timeout = useRef(null);

  const handleSubmitBotForm = (event) => {
    event.preventDefault();
    const addBotElement = document.getElementById("addBot");
    setBotList([
      ...botList,
      bots.filter((bot) => bot.name === addBotElement.value)[0],
    ]);
    console.log(bots.filter((bot) => bot.name === addBotElement.value)[0]);
    addBotElement.value = "";
  };

  const handleRemoveBot = (botItem) => {
    setBotList(botList.filter((bot) => bot.id !== botItem.id));
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
  };

  const handleChangeJobStatus = (index) => {
    if (botList[index].status.toLowerCase() === "running") {
      stopBot(index);
    } else if (botList[index].status.toLowerCase() === "stopped") {
      startBot(index);
    } else if (botList[index].status.toLowerCase() === "completed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        startBot(index);
      }
    }
  };

  const startBot = (index) => {
    updateObj(index, "status", "Running");
    setButtonText("Stop Bot");
    timeout.current = setTimeout(
      () => {
        updateObj(index, "status", "Completed");
        setButtonText("Start Bot");
      },
      getRandomArbitrary(4000, 10000),
    );
  }

  const stopBot = (index) => {
    updateObj(index, "status", "Stopped");
    setButtonText("Start Bot");
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
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

  return (
    <div className="bot-list-manager">
      <h2>Bot List Manager</h2>
      <form onSubmit={handleSubmitBotForm}>
        <label htmlFor="addBot">
          Add a new bot:
          <br />
        </label>
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
      <ul>
        {botList.map((bot, index) => (
          <li key={index} className="list-item-bot">
            <div>
              <h3>{bot.name}</h3>
              <p>{bot.task}</p>
              <div className="status-container">
                <div className="status">
                  <span
                    className={"status-ball " + bot.status.toLowerCase()}
                  ></span>
                  {bot.status}
                </div>
                <button
                  className="button-neutral"
                  onClick={() => handleChangeJobStatus(index)}
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <button
              className="remove-button"
              onClick={() => handleRemoveBot(bot)}
            >
              <i className="bi bi-x"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotListManager;
