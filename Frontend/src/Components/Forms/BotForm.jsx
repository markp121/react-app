import React, { useEffect } from "react";
import axios from "axios";

const BotForm = (props) => {
  const {
    botsState,
    changedBot,
    setChangedBot,
    setBotList,
    botListItem,
    handleDeleteBot,
    onSuccess,
  } = props;

  const handleSubmitBotForm = (e) => {
    e.preventDefault();
    const botName = e.target.querySelector("#botName");
    const botTask = e.target.querySelector("#botTask");

    const bots = botListItem ? botsState.filter((a) => a.id !== botListItem.id) : botsState;
    if (bots.map((a) => a.name.toLowerCase()).includes(botName.value.toLowerCase())) {
      alert("Duplicate Bot Name!");
      return false;
    } else {
      setChangedBot({ name: botName.value, task: botTask.value });
    }
    onSuccess();
  };

  useEffect(() => {
    const newBot = async () => {
      try {
        await axios.post("http://localhost:8800/bots", changedBot);
      } catch (err) {
        console.log(err);
      }
    };
    const updateBot = async () => {
      try {
        await axios.put("http://localhost:8800/bots/" + botListItem.id, changedBot);
      } catch (err) {
        console.log(err);
      }
    };
    if (changedBot) {
      if (botListItem) {
        updateBot().then(() => setChangedBot());
        setBotList((prev) =>
          prev.map((b) => (b.id === botListItem.id ? { ...b, ...changedBot } : b)),
        );
      } else {
        newBot().then(() => setChangedBot());
      }
    }
  }, [changedBot, botListItem, setChangedBot, setBotList]);

  return (
    <div className="bot-form-container">
      <div className="form-header">
        <h2>Edit Bot</h2>
        {botListItem && (
          <button className="button danger" onClick={() => handleDeleteBot(botListItem.id, onSuccess)}>
            Delete
          </button>
        )}
      </div>
      <form onSubmit={handleSubmitBotForm}>
        <div className="form-inputs">
          <div>
            <label htmlFor="botName">Bot Name:</label>
            <br />
            <input
              type="text"
              id="botName"
              defaultValue={botListItem ? botListItem.name : ""}
              placeholder="Enter Bot name..."
              required
            />
          </div>
          <div>
            <label htmlFor="botTask">Bot Task</label> <br />
            <input
              type="text"
              id="botTask"
              defaultValue={botListItem ? botListItem.task : ""}
              placeholder="Enter Bot task..."
              required
            />
          </div>
        </div>
        <button type="submit" className="button success">
          {botListItem ? "Save Bot" : "Create Bot"}
        </button>
      </form>
    </div>
  );
};

export default BotForm;
