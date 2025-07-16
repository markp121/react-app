import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import EditBotForm from "./Forms/EditBotForm";

const BotListItem = ({ botListItem, botsState, setBotsState, setBotList }) => {
  const [botStatus, setBotStatus] = useState(botListItem.status);

  const timeoutRef = useRef(null);

  const handleRemoveBot = () => {
    setBotStatus("Stopped");
    setBotList((a) => a.filter((b) => b.listId !== botListItem.listId));
  };

  const handleDeleteBot = (closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    if (confirm) {
      setBotStatus("Stopped");
      setBotsState(botsState.filter((a) => a.id !== botListItem.id));
      closeModal();
    }
  };

  const handleChangeBotStatus = () => {
    if (botStatus === "Running") {
      setBotStatus("Stopped");
    } else if (botStatus === "Stopped") {
      setBotStatus("Running");
    } else if (botStatus === "Completed" || botStatus === "Failed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        setBotStatus("Running");
      }
    }
  };

  useEffect(() => {
    if (botStatus === "Running") {
      const executeBotTask = () => {
        return new Promise((resolve, reject) => {
          timeoutRef.current = setTimeout(
            () => {
              const success = Math.random() < 0.8;
              success ? resolve("Completed") : reject("Failed");
            },
            getRandomArbitrary(5000, 5000),
          );
        });
      };
      executeBotTask().then(
        (resolve) => setBotStatus(resolve),
        (reject) => setBotStatus(reject),
      );
    } else {
      clearTimeout(timeoutRef.current);
    }
  }, [botStatus]);

  useEffect(() => {
    setBotList((a) =>
      a.map((b) => (b.listId === botListItem.listId ? { ...b, status: botStatus } : b)),
    );
  }, [setBotList, botStatus, botListItem.listId]);

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <li className="bot-list-item">
      <div>
        <h3>{botListItem.name}</h3>
        <p>{botListItem.task}</p>
        <div className="bot-status-container">
          <div className="bot-status">
            <span className={"bot-status-ball " + botListItem.status.toLowerCase()}></span>
            {botListItem.status}
          </div>
          <button
            className={botStatus === "Running" ? "button danger" : "button success"}
            onClick={() => handleChangeBotStatus()}
          >
            {botStatus === "Running" ? "Stop Bot" : "Start Bot"}
          </button>
        </div>
      </div>
      <div className="functional-buttons">
        <button className="icon-button remove" onClick={() => handleRemoveBot()}>
          <i className="bi bi-x"></i>
        </button>
        <Modal
          openButtonClass={"icon-button edit"}
          openButtonInnerHtml={<i className="bi bi-pencil"></i>}
        >
          <EditBotForm
            botsState={botsState}
            setBotsState={setBotsState}
            botListItem={botListItem}
            handleDeleteFunc={handleDeleteBot}
          />
        </Modal>
        <button className="icon-button delete" onClick={() => handleDeleteBot()}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default BotListItem;
