import React from "react";

const EditBotForm = ({ bots, setBots, botListItem }) => {
  const handleEditBotForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const botNameElement = form.getElementById("botName");
    const botTaskElement = form.getElementById("botTask");
    updateBotObject(botListItem.id, botNameElement.value, botTaskElement.value);
  };

  function updateBotObject(id, newName, newTask) {
    const index = bots.findIndex((bot) => bot.id === id);
    setBots((bots) => [
      ...bots.slice(0, index),
      { ...bots[index], name: newName, task: newTask },
      ...bots.slice(index + 1),
    ]);
  }

  return (
    <>
      <h2>Edit Bot</h2>
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
        <button type="submit" className="button-neutral">
          Save Bot
        </button>
      </form>
    </>
  );
};

export default EditBotForm;
