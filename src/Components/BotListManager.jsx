import React, { useEffect, useState } from "react";

const BotListManager = ({ name, task, status }) => {
  const [botStatus, setBotStatus] = useState(status);

  const triggerJob = () => {
    if (botStatus.toLowerCase() === "running") {
      setBotStatus("Stopped");
    } else if (botStatus.toLowerCase() === "stopped") {
      setBotStatus("Running");
    } else if (botStatus.toLowerCase() === "completed") {
      const statusValue = window.confirm("Do you want to restart the bot?") ? "Running" : "Completed";
      setBotStatus(statusValue);
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    setTimeout(
      () => {
        if (botStatus.toLowerCase() === "running") {
          setBotStatus("Completed");
        }
      },
      getRandomArbitrary(4000, 10000),
    );
  }, [botStatus]);

  return (
    <div>
      <h3>{name}</h3>

      <p>{task}</p>
      <div className="status-container">
        <div className="status">
          <span className={"status-ball " + botStatus.toLowerCase()}></span>
          {botStatus}
        </div>
        <button className="button-neutral" onClick={triggerJob} >Trigger Job</button>
      </div>
    </div>
  );
};

export default BotListManager;
