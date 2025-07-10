import React from "react";

const NewBotForm = ({ botsState, setBotsState }) => {
  const handleSubmitNewBotForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const botName = form.querySelector("#botName");
    const botTask = form.querySelector("#botTask");
    const id = botsState[botsState.length - 1].id + 1;

    if (botsState.filter((bot) => bot.name.toLowerCase() === botName.value.toLowerCase()).length) {
      alert("Duplicate Bot Name");
      return false;
    } else {
      setBotsState([
        ...botsState,
        { id: id, name: botName.value, task: botTask.value, status: "Stopped" },
      ]);
    }
  };

  return (
    <>
      <h2>Create New Bot</h2>
      <form className="modal-form" onSubmit={handleSubmitNewBotForm}>
        <div className="form-inputs">
          <div>
            <label htmlFor="botName">Bot Name</label>
            <br />
            <input type="text" id="botName" placeholder="Enter bot's name..." required />
          </div>
          <div>
            <label htmlFor="botTask">Bot Task</label> <br />
            <input type="text" id="botTask" placeholder="Enter bot's task..." required />
          </div>
        </div>
        <button type="submit" className="button success">
          Create Bot
        </button>
      </form>
    </>
  );
};

export default NewBotForm;
