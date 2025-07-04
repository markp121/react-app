import React, { useState } from "react";

let nextId = 0;

const DynamicForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedItems, setSubmittedItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    transitionResetButton();
  };

  const handleReset = () => {
    const input = document.getElementById("dynamicTextInput");
    input.value = "";
    setInputValue(input.value);
    transitionResetButton();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = document.getElementById("dynamicTextInput");
    setSubmittedItems([
      ...submittedItems,
      {
        id: nextId++,
        title: input.value,
      },
    ]);
    input.value = "";
    setInputValue(input.value);
    transitionResetButton();
  };

  const handleRemove = (submittedItem) => {
    setSubmittedItems(
      submittedItems.filter((item) => item.id !== submittedItem.id)
    );
  };

  const transitionResetButton = () => {
    const textInput = document.getElementById("dynamicTextInput").value;
    const resetButton = document.querySelector(".form-reset");
    resetButton.style.visibility = textInput === "" ? "hidden" : "visible";
    resetButton.style.opacity = textInput === "" ? "0" : "1";
  }

  return (
    <div className="dynamic-form-container">
      <h2>Dynamic List</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <label className="text-input-field" htmlFor="dynamicTextInput">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="&nbsp;"
            id="dynamicTextInput"
            required
          />
          <span className="label">Enter text...</span>
          <span className="form-reset" onClick={handleReset}>
            x
          </span>
        </label>
        <input type="submit" hidden />
      </form>
      <div>
        <h3>Current Input:</h3>
        <p className="input-tracker">{inputValue}</p>
        <p>Input Character Count: {inputValue.length}</p>
        <ul>
          {submittedItems.map((item) => (
            <li
              key={item.id}
              className="list-item"
            >
              {item.title}
              <button className="remove-button" onClick={() => handleRemove(item)}>
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
