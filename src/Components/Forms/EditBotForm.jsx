import React from "react";

const EditBotForm = ({ botsState, setBotsState, botListItem, handleDeleteFunc, onSuccess }) => {
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
      editBot(botName.value, botTask.value);
    }
    onSuccess();
  };

  function editBot(newName, newTask) {
    setBotsState((a) =>
      a.map((b) => (b.id === botListItem.id ? { ...b, name: newName, task: newTask } : b)),
    );
  }

  return (
    <>
      <div className="modal-header">
        <h2>Edit Bot</h2>
        <button className="button danger" onClick={() => handleDeleteFunc(onSuccess)}>
          Delete
        </button>
      </div>
      <form className="modal-form" onSubmit={handleEditBotForm}>
        <div className="form-inputs">
          <div>
            <label htmlFor="botName">Bot Name</label>
            <br />
            <input type="text" id="botName" defaultValue={botListItem.name} required />
          </div>
          <div>
            <label htmlFor="botTask">Bot Task</label> <br />
            <input type="text" id="botTask" defaultValue={botListItem.task} required />
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
