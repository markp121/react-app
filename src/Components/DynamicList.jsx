import React, { useState } from "react";
import DynamicTextInput from "./DynamicTextInput";

let nextId = 0;

const DynamicList = () => {
  const [dynamicListInput, setDynamicListInput] = useState("");
  const [dynamicList, setDynamicList] = useState([]);

  const handleSubmitDynamicListForm = (event) => {
    event.preventDefault();
    const input = document.getElementById("textInput");
    setDynamicList([
      ...dynamicList,
      {
        id: nextId++,
        title: input.value,
      },
    ]);
    input.value = "";
    setDynamicListInput(input.value);
  };

  const handleRemoveDynamicListItem = (listItem) => {
    setDynamicList(dynamicList.filter((item) => item.id !== listItem.id));
  };

  return (
    <div className="dynamic-list">
      <h2>Dynamic List</h2>
      <form className="form-group" onSubmit={handleSubmitDynamicListForm}>
        <DynamicTextInput
          textInput={dynamicListInput}
          setTextInput={setDynamicListInput}
          placeholder={"Enter new list item..."}
        />
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
  );
};

export default DynamicList;
