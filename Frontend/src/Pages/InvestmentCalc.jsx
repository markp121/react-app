import React, { useEffect, useState } from "react";
import UserInput from "../Components/UserInput.jsx";
import axios from "axios";
import OutputData from "../Components/OutputData.jsx";

const initialState = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

const InvestmentCalc = () => {
  const [currencyTable, setCurrencyTable] = useState();
  const [currency, setCurrency] = useState("usd");
  const [userInput, setUserInput] = useState(initialState);

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        return await axios(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
        );
      } catch (error) {
        console.log(error);
      }
    };
    getExchangeRates().then((res) => {
      setCurrencyTable(res.data[`${currency}`]);
    });
  }, [currency]);

  return (
    <>
      <header>
        <h1>Investment Calculator</h1>
      </header>
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        currency={currency}
        setCurrency={setCurrency}
        currencyTable={currencyTable}
        initialState={initialState}
      />
      <OutputData inputValue={userInput} currency={currency}/>
    </>
  );
};

export default InvestmentCalc;
