import React, { useEffect, useState } from "react";

const DynamicTextInput = ({ textInput, setTextInput, placeholder}) => {
  const [showReset, setShowReset] = useState(false);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleResetInput = (event) => {
    const input = event.target.parentNode.getElementsByTagName("input")[0];
    input.value = "";
    input.focus()
    setTextInput(input.value);
  };

  useEffect(() => {
    setShowReset(textInput !== "");
  }, [textInput]);

  return (
    <label className="text-input-field" htmlFor="textInput">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="&nbsp;"
        id="textInput"
        required
      />
      <span className="label">{placeholder}</span>
      {showReset && (
        <span className="form-reset" onClick={handleResetInput}>
          x
        </span>
      )}
    </label>
  );
};

export default DynamicTextInput;
