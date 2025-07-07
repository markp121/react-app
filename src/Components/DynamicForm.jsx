import React, { useState } from "react";
import BotListManager from "./BotListManager";

let nextId = 0;

const DynamicForm = ({ bots }) => {
  const [dynamicListInput, setDynamicListInput] = useState("");
  const [dynamicList, setDynamicList] = useState([]);
  const [botList, setBotList] = useState([]);

  const handleInputChange = (event) => {
    setDynamicListInput(event.target.value);
    transitionResetButton();
  };

  const handleResetDynamicListInput = () => {
    const input = document.getElementById("dynamicListInput");
    input.value = "";
    setDynamicListInput(input.value);
    transitionResetButton();
  };

  const handleSubmitDynamicListForm = (event) => {
    event.preventDefault();
    const input = document.getElementById("dynamicListInput");
    setDynamicList([
      ...dynamicList,
      {
        id: nextId++,
        title: input.value,
      },
    ]);
    input.value = "";
    setDynamicListInput(input.value);
    transitionResetButton();
  };

  const handleRemoveDynamicListItem = (submittedItem) => {
    setDynamicList(
      dynamicList.filter((item) => item.id !== submittedItem.id),
    );
  };

  const handleSubmitBotForm = (event) => {
    event.preventDefault();
    const addBotElement = document.getElementById("addBot");
    setBotList([...botList, bots.filter((bot) => bot.name === addBotElement.value)[0]]);
    addBotElement.value = "";
  };

  const handleRemoveBot = (botItem) => [
    setBotList(botList.filter((bot) => bot.id !== botItem.id)),
  ];

  const transitionResetButton = () => {
    const resetButton = document.querySelector(".form-reset");
    const textInput = document.getElementById("dynamicListInput").value;
    resetButton.style.visibility = textInput === "" ? "hidden" : "visible";
    resetButton.style.opacity = textInput === "" ? "0" : "1";
  };

  return (
    <div className="dynamic-form-container">
      <div className="dynamic-list">
        <h2>Dynamic List</h2>
        <form className="form-group" onSubmit={handleSubmitDynamicListForm}>
          <label className="text-input-field" htmlFor="dynamicListInput">
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="&nbsp;"
              id="dynamicListInput"
              required
            />
            <span className="label">Enter new list item...</span>
            <span className="form-reset" onClick={handleResetDynamicListInput}>
              x
            </span>
          </label>
          <input type="submit" hidden />
        </form>
        <div>
          <h3>Current Input:</h3>
          <p className="input-tracker">{dynamicListInput}</p>
          <p>Input Character Count: {dynamicListInput.length}</p>
          <ul>
            {dynamicList.map((item) => (
              <li key={item.id} className="list-item">
                {item.title}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveDynamicListItem(item)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bot-list-manager">
        <h2>Bot List Manager</h2>
        <form onSubmit={handleSubmitBotForm}>
          <label htmlFor="addBot">Add a new bot:<br /></label>
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
          <button type="submit" className="button-neutral">Add Bot</button>
        </form>
        <ul>
          {botList.map((bot, index) => (
            <li key={index} className="list-item bot">
              <BotListManager
                name={bot.name}
                task={bot.task}
                status={bot.status}
              />
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
    </div>
  );
};

export default DynamicForm;
