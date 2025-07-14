import React from "react";

const EditBotForm = ({ botsState, setBotsState, botListItem, handleDeleteFunc, onSuccess }) => {
  const handleEditBotForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const botName = form.querySelector("#botName");
    const botTask = form.querySelector("#botTask");

    const compare = botsState.filter((bot) => bot.id !== botListItem.id);
    if (compare.filter((bot) => bot.name.toLowerCase() === botName.value.toLowerCase()).length) {
      alert("Duplicate Bot Name!");
      return false;
    } else {
      updateBotObject(botListItem.id, botName.value, botTask.value);
    }
    onSuccess();
  };

  function updateBotObject(id, newName, newTask) {
    const index = botsState.findIndex((bot) => bot.id === id);
    setBotsState((botsState) => [
      ...botsState.slice(0, index),
      { ...botsState[index], name: newName, task: newTask },
      ...botsState.slice(index + 1),
    ]);
  }

  return (
    <>
      <div className="modal-header">
        <h2>Edit Bot</h2>
        <button className="button danger" onClick={() => handleDeleteFunc(botListItem, onSuccess)}>
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
