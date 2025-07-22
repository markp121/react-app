import React, { useRef } from "react";
import Modal from "./Modal";
import EditBotForm from "./Forms/EditBotForm";

const BotListItem = (props) => {
  const { botListItem, botsState, setBotsState, setBotList, executeBotTask } = props;

  const timeoutRef = useRef(null);

  const handleRemoveBot = () => {
    setBotList((a) => a.filter((b) => b.listId !== botListItem.listId));
  };

  const handleDeleteBot = (closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    if (confirm) {
      setBotsState((botsState) => botsState.filter((a) => a.id !== botListItem.id));
      closeModal();
    }
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
          <EditBotForm
            botsState={botsState}
            setBotsState={setBotsState}
            botListItem={botListItem}
            handleDeleteBot={handleDeleteBot}
            setBotList={setBotList}
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
