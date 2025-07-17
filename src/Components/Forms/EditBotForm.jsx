import React, { useCallback, useEffect, useState } from "react";

const EditBotForm = (props) => {
  const { botsState, setBotsState, botListItem, handleDeleteBot, setBotList, onSuccess } = props;

  const [name, setName] = useState(botListItem.name);
  const [task, setTask] = useState(botListItem.task);

  const handleEditBotForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const botName = form.querySelector("#botName");
    const botTask = form.querySelector("#botTask");

    const usedNames = botsState
      .filter((a) => a.id !== botListItem.id)
      .map((b) => b.name.toLowerCase());
    if (usedNames.includes(botName.value.toLowerCase())) {
      alert("Duplicate Bot Name!");
      return false;
    } else {
      setName(botName.value);
      setTask(botTask.value);
    }
    onSuccess();
  };

  const updateTaskName = useCallback(
    (setState) => {
      setState((a) =>
        a.map((b) => (b.id === botListItem.id ? { ...b, name: name, task: task } : b)),
      );
    },
    [botListItem.id, name, task],
  );

  useEffect(() => {
    updateTaskName(setBotsState);
    updateTaskName(setBotList);
  }, [setBotsState, setBotList, updateTaskName]);

  return (
    <>
      <div className="modal-header">
        <h2>Edit Bot</h2>
        <button className="button danger" onClick={() => handleDeleteBot(onSuccess)}>
          Delete
        </button>
      </div>
      <form className="modal-form" onSubmit={handleEditBotForm}>
        <div className="form-inputs">
          <div>
            <label htmlFor="botName">Bot Name</label>
            <br />
            <input type="text" id="botName" defaultValue={name} required />
          </div>
          <div>
            <label htmlFor="botTask">Bot Task</label> <br />
            <input type="text" id="botTask" defaultValue={task} required />
          </div>
        </div>
        <button type="submit" className="button success">
          Save Bot
        </button>
      </form>
    </>
  );
};

export default EditBotForm;
