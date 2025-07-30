import React, { useEffect } from "react";

const codes = [
  { code: "usd", symbol: "$" },
  { code: "gbp", symbol: "£" },
  { code: "eur", symbol: "€" },
];

const UserInput = ({
  userInput,
  setUserInput,
  currency,
  setCurrency,
  currencyTable,
  initialState,
}) => {
  const handleChange = (inputIdentifier, newValue) => {
    setUserInput((prev) => ({
      ...prev,
      [inputIdentifier]: newValue,
    }));
  };

  useEffect(() => {
    if (currencyTable) {
      setUserInput((prev) => {
        return {
          ...prev,
          initialInvestment: (prev.initialInvestment * currencyTable[currency]).toFixed(2),
          annualInvestment: (prev.annualInvestment * currencyTable[currency]).toFixed(2),
        };
      });
    }
  }, [currency, currencyTable, setUserInput]);

  return (
    <section id="user-input">
      <form>
        <div className="input-group">
          <label htmlFor="currency">Select Currency</label>
          <select
            className="job-status"
            id="currency"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
            style={{ textTransform: "uppercase" }}
            required
          >
            {codes.map((code, index) => (
              <option key={index} value={code.code} style={{ textTransform: "uppercase" }}>
                {code.code}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="initialInvestment">
            Initial Investment ({codes.find((c) => c.code === currency).symbol})
          </label>
          <input
            type="number"
            id="initialInvestment"
            value={userInput.initialInvestment && Math.max(0, userInput.initialInvestment)}
            onChange={(e) =>
              handleChange("initialInvestment", e.target.value < 0 ? 0 : e.target.value)
            }
            min={0}
          />
        </div>
        <div className="input-group">
          <label htmlFor="annualInvestment">
            Annual Investment ({codes.find((c) => c.code === currency).symbol})
          </label>
          <input
            type="number"
            id="annualInvestment"
            value={userInput.annualInvestment && Math.max(0, userInput.annualInvestment)}
            onChange={(e) =>
              handleChange("annualInvestment", e.target.value < 0 ? 0 : e.target.value)
            }
            min={0}
          />
        </div>
        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>
          <input
            type="number"
            id="expectedReturn"
            value={userInput.expectedReturn && Math.max(0, userInput.expectedReturn)}
            onChange={(e) =>
              handleChange("expectedReturn", e.target.value < 0 ? 0 : e.target.value)
            }
            min={0}
          />
        </div>
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput.duration && Math.max(0, userInput.duration)}
            onChange={(e) => handleChange("duration", e.target.value < 0 ? 0 : e.target.value)}
            min={0}
          />
        </div>
        <button type="button" className="button neutral" onClick={() => setUserInput(initialState)}>
          Reset
        </button>
      </form>
    </section>
  );
};

export default UserInput;
