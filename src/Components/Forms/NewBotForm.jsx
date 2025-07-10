import React from "react";

const NewBotForm = ({ bots, setBots }) => {
  const handleSubmitNewBotForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const botNameElement = form.querySelector("#botName");
    const botTaskElement = form.querySelector("#botTask");
    const id = bots[bots.length - 1].id + 1;
    if (bots.map((bot) => bot.name.toLowerCase() === botNameElement.value.toLowerCase()).includes(true)) {
      alert("Duplicate Bot Name");
      return false;
    } else {
      setBots([...bots, { id: id, name: botNameElement.value, task: botTaskElement.value, status: "Stopped" }]);
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
        <button type="submit" className="button-neutral">
          Add Bot
        </button>
      </form>
    </>
  );
};

export default NewBotForm;
