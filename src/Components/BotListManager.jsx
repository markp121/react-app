import React, { useEffect, useRef, useState } from "react";

const BotListManager = ({ name, task, status }) => {
  const [botStatus, setBotStatus] = useState(status);
  const [buttonText, setButtonText] = useState("Start Bot");

  const toggleJobStatus = () => {
    if (botStatus.toLowerCase() === "running") {
      setBotStatus("Stopped");
      setButtonText("Start Bot");
    } else if (botStatus.toLowerCase() === "stopped") {
      setBotStatus("Running");
      setButtonText("Stop Bot");
    } else if (botStatus.toLowerCase() === "completed") {
      const statusValue = window.confirm("Do you want to restart the bot?") ? "Running" : "Completed";
      setBotStatus(statusValue);
      setButtonText("Stop Bot");
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const timeout = useRef(null);

  useEffect(() => {
    if (botStatus.toLowerCase() === "running") {
      timeout.current = setTimeout(
        () => {
          setBotStatus("Completed");
          setButtonText("Restart Bot");
        },
        getRandomArbitrary(4000, 10000),
      );
    }
    if (botStatus.toLowerCase() === "stopped" && timeout.current !== null) {
      clearTimeout(timeout.current);
    }
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
        <button className="button-neutral" onClick={toggleJobStatus}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default BotListManager;
