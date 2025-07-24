import React, { useEffect } from "react";
import axios from "axios";

const NewBotForm = ({ botsState, newBot, setNewBot, onSuccess }) => {
  const handleSubmitNewBotForm = (event) => {
    event.preventDefault();
    const botName = event.target.querySelector("#botName");
    const botTask = event.target.querySelector("#botTask");

    if (botsState.filter((bot) => bot.name.toLowerCase() === botName.value.toLowerCase()).length) {
      alert("Duplicate Bot Name");
      return false;
    } else {
      setNewBot({ name: botName.value, task: botTask.value });
    }
    onSuccess();
  };

  useEffect(() => {
    const postNewBot = async () => {
      try {
        await axios.post("http://localhost:8800/bots", newBot);
      } catch (err) {
        console.log(err);
      }
    };
    if (newBot) {
      postNewBot();
      setNewBot();
    }
  }, [newBot, setNewBot]);

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
