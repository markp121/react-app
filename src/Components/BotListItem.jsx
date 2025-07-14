import React, { useRef, useState } from "react";
import Modal from "./Modal";
import EditBotForm from "./Forms/EditBotForm";

const BotListItem = ({ botListItem, botsState, setBotsState, setBotList }) => {
  const [buttonText, setButtonText] = useState("Start Bot");
  const [buttonClass, setButtonClass] = useState("button success");

  const timeoutRef = useRef(null);

  const handleRemoveBot = (removedBot) => {
    setBotList((botList) => botList.filter((botListItem) => botListItem.listId !== removedBot.listId));
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDeleteBot = (deletedBot, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    if (confirm) {
      setBotsState(botsState.filter((bot) => bot.id !== deletedBot.id));
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      closeModal();
    }
  };

  const handleChangeBotStatus = (updatedBot) => {
    if (botListItem.status.toLowerCase() === "running") {
      stopBot(updatedBot);
    } else if (botListItem.status.toLowerCase() === "stopped") {
      startBot(updatedBot);
    } else if (botListItem.status.toLowerCase() === "completed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        startBot(updatedBot);
      }
    }
  };

  function startBot(updatedBot) {
    updateBotStatus(updatedBot, "Running");
    setButtonText("Stop Bot");
    setButtonClass("button danger");
    timeoutRef.current = setTimeout(
      () => {
        updateBotStatus(updatedBot, "Completed");
        setButtonText("Start Bot");
        setButtonClass("button success");
      },
      getRandomArbitrary(4000, 10000),
    );
  }

  function stopBot(updatedBot) {
    updateBotStatus(updatedBot, "Stopped");
    setButtonText("Start Bot");
    setButtonClass("button success");
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  function updateBotStatus(updatedBot, value) {
    setBotList((botList) =>
      botList.map((botListItem) =>
        botListItem.listId === updatedBot.listId ? { ...botListItem, status: value } : botListItem,
      ),
    );
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <li className="bot-list-item">
      <div>
        <h3>{botListItem.name}</h3>
        <p>{botListItem.task}</p>
        <div className="status-container">
          <div className="status">
            <span className={"status-ball " + botListItem.status.toLowerCase()}></span>
            {botListItem.status}
          </div>
          <button className={buttonClass} onClick={() => handleChangeBotStatus(botListItem)}>
            {buttonText}
          </button>
        </div>
      </div>
      <div className="bot-list-item-buttons">
        <button className="icon-button remove" onClick={() => handleRemoveBot(botListItem)}>
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
        <button className="icon-button delete" onClick={() => handleDeleteBot(botListItem)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default BotListItem;
