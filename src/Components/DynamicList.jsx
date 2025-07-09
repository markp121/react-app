import React, { useState } from "react";

let nextId = 0;

const DynamicList = () => {
  const [dynamicListInput, setDynamicListInput] = useState("");
  const [dynamicList, setDynamicList] = useState([]);

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
    setDynamicList(dynamicList.filter((item) => item.id !== submittedItem.id));
  };

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
                  className="icon-button remove"
                  onClick={() => handleRemoveDynamicListItem(item)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicList;
