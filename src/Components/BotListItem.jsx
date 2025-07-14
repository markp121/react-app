import React, { useRef, useState } from "react";
import Modal from "./Modal";
import EditBotForm from "./Forms/EditBotForm";

const BotListItem = ({ bot, index, botsState, setBotsState, setDisplayedBots }) => {
  const [buttonText, setButtonText] = useState("Start Bot");
  const [buttonClass, setButtonClass] = useState("button success");

  const timeoutRef = useRef(null);

  const handleRemoveBot = (index) => {
    setDisplayedBots((displayedBots) => [
      ...displayedBots.slice(0, index),
      ...displayedBots.slice(index + 1),
    ]);
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

  const handleChangeBotStatus = (index) => {
    if (bot.status.toLowerCase() === "running") {
      stopBot(index);
    } else if (bot.status.toLowerCase() === "stopped") {
      startBot(index);
    } else if (bot.status.toLowerCase() === "completed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        startBot(index);
      }
    }
  };

  function startBot(index) {
    updateBotStatus(index, "Running");
    setButtonText("Stop Bot");
    setButtonClass("button danger");
    timeoutRef.current = setTimeout(
      () => {
        updateBotStatus(index, "Completed");
        setButtonText("Start Bot");
        setButtonClass("button success");
      },
      getRandomArbitrary(4000, 10000),
    );
  }

  function stopBot(index) {
    updateBotStatus(index, "Stopped");
    setButtonText("Start Bot");
    setButtonClass("button success");
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  function updateBotStatus(index, value) {
    setDisplayedBots((displayedBots) => [
      ...displayedBots.slice(0, index),
      { ...displayedBots[index], status: value },
      ...displayedBots.slice(index + 1),
    ]);
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <li className="bot-list-item">
      <div>
        <h3>{bot.name}</h3>
        <p>{bot.task}</p>
        <div className="status-container">
          <div className="status">
            <span className={"status-ball " + bot.status.toLowerCase()}></span>
            {bot.status}
          </div>
          <button className={buttonClass} onClick={() => handleChangeBotStatus(index)}>
            {buttonText}
          </button>
        </div>
      </div>
      <div className="bot-list-item-buttons">
        <button className="icon-button remove" onClick={() => handleRemoveBot(index)}>
          <i className="bi bi-x"></i>
        </button>
        <Modal
          openButtonClass={"icon-button edit"}
          openButtonInnerHtml={<i className="bi bi-pencil"></i>}
        >
          <EditBotForm
            botsState={botsState}
            setBotsState={setBotsState}
            botListItem={bot}
            handleDeleteFunc={handleDeleteBot}
          />
        </Modal>
        <button className="icon-button delete" onClick={() => handleDeleteBot(bot)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default BotListItem;
