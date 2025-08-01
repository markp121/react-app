import React, { useRef } from "react";
import Modal from "./Modal";
import BotForm from "./Forms/BotForm";

const BotListItem = (props) => {
  const {
    botsState,
    setBotList,
    updatedBot,
    setUpdatedBot,
    botListItem,
    executeBotTask,
    handleDeleteBot,
  } = props;

  const timeoutRef = useRef(null);

  const handleRemoveBot = () => {
    setBotList((prev) => prev.filter((a) => a.listId !== botListItem.listId));
  };

  const handleChangeBotStatus = () => {
    if (botListItem.status === "Running") {
      updateBotStatus("Stopped");
      clearTimeout(timeoutRef.current);
    } else if (botListItem.status === "Stopped") {
      updateBotStatus("Running");
      executeBotTask(timeoutRef, updateBotStatus);
    } else if (botListItem.status === "Completed" || botListItem.status === "Failed") {
      const confirm = window.confirm("Do you want to restart the bot?");
      if (confirm) {
        updateBotStatus("Running");
        executeBotTask(timeoutRef, updateBotStatus);
      }
    }
  };

  function updateBotStatus(botStatus) {
    setBotList((a) =>
      a.map((b) => (b.listId === botListItem.listId ? { ...b, status: botStatus } : b)),
    );
  }

  return (
    <li className="bot-list-item">
      <div className="bot-list-item-info">
        <h3>{botListItem.name}</h3>
        <p>{botListItem.task}</p>
        <div className="bot-status-container">
          <div className="bot-status">
            <span className={"bot-status-ball " + botListItem.status.toLowerCase()}></span>
            {botListItem.status}
          </div>
          <button
            className={botListItem.status === "Running" ? "button danger" : "button success"}
            onClick={() => handleChangeBotStatus()}
          >
            {botListItem.status === "Running" ? "Stop Bot" : "Start Bot"}
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
          <BotForm
            botsState={botsState}
            changedBot={updatedBot}
            setChangedBot={setUpdatedBot}
            setBotList={setBotList}
            botListItem={botListItem}
            handleDeleteBot={handleDeleteBot}
          />
        </Modal>
        <button className="icon-button delete" onClick={() => handleDeleteBot(botListItem.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default BotListItem;
