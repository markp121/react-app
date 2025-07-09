import React from "react";

const NewBotForm = ({ bots, setBots }) => {
  const handleSubmitNewBotForm = (event) => {
    event.preventDefault();
    const botNameElement = document.getElementById("botName");
    const botTask = document.getElementById("botTask").value;
    const id = bots[bots.length - 1].id + 1;
    if (bots.map((bot) => bot.name.toLowerCase() === botNameElement.value.toLowerCase()).includes(true)) {
      alert("Duplicate Bot Name");
      return false;
    } else {
      setBots([...bots, { id: id, name: botNameElement.value, task: botTask, status: "Stopped" }]);
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
            <input type="text" id="botName" required />
          </div>
          <div>
            <label htmlFor="botTask">Bot Task</label> <br />
            <input type="text" id="botTask" required />
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
