import React, { useEffect } from "react";
import axios from "axios";

const EditBotForm = (props) => {
  const { botListItem, botsState, updatedBot, setUpdatedBot, handleDeleteBot, onSuccess } = props;

  const handleEditBotForm = (event) => {
    event.preventDefault();
    const botName = event.target.querySelector("#botName");
    const botTask = event.target.querySelector("#botTask");

    const usedNames = botsState.filter((a) => a.id !== botListItem.id);
    if (usedNames.map((b) => b.name.toLowerCase()).includes(botName.value.toLowerCase())) {
      alert("Duplicate Bot Name!");
      return false;
    } else {
      setUpdatedBot({
        name: botName.value,
        task: botTask.value,
      });
    }
    onSuccess();
  };

  useEffect(() => {
    const updateBot = async () => {
      try {
        await axios.put("http://localhost:8800/bots/" + botListItem.id, updatedBot);
      } catch (err) {
        console.log(err);
      }
    };
    if (updatedBot) {
      updateBot();
      setUpdatedBot();
    }
  }, [updatedBot, botListItem.id, setUpdatedBot]);

  return (
    <>
      <div className="modal-header">
        <h2>Edit Bot</h2>
        <button className="button danger" onClick={() => handleDeleteBot(botListItem, onSuccess)}>
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
