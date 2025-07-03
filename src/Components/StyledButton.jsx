import React from "react";

const StyledButton = () => {
  let isDisabled = false;

  function toggleDisabled(event) {
    const current = event.currentTarget;
    current.disabled = !isDisabled;
    current.style.opacity = "0.2";
    current.style.backgroundColor = "white"
    current.style.cursor = "default";
  }

  const buttonStyle = {
    padding: "1rem",
    backgroundColor: "white",
    color: "black",
    border: "solid 1px black",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: "1",
  };

  return (
    <div>
      <button
        disabled={isDisabled}
        onClick={(event) => toggleDisabled(event)}
        style={buttonStyle}
        onMouseEnter={(event) => {event.currentTarget.style.backgroundColor = event.currentTarget.disabled ? "white" : "grey";}}
        onMouseLeave={(event) => {event.currentTarget.style.backgroundColor = "white";}}
      >
        Button
      </button>
    </div>
  );
};

export default StyledButton;
