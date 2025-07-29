import React, { useEffect, useState } from "react";
import { calculateInvestmentResults } from "../utils/investments.js";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from "./LineChart.jsx";

Chart.register(CategoryScale);

const OutputData = ({ inputValue, currency }) => {
  const initialResults = calculateInvestmentResults({
    initialInvestment: +inputValue.initialInvestment,
    annualInvestment: +inputValue.annualInvestment,
    expectedReturn: +inputValue.expectedReturn,
    duration: +inputValue.duration,
  });
  const [resultData, setResultsData] = useState(initialResults);

  const initialChartData = {
    labels: resultData.map((data) => data.year),
    datasets: [
      {
        label: "Investment Value",
        data: resultData.map((data) => data.investmentValue),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const [chartData, setChartData] = React.useState(initialChartData);

  useEffect(() => {
    setResultsData(
      calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration,
      }),
    );
  }, [inputValue]);

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      labels: resultData.map((data) => data.year),
      datasets: [
        {
          data: resultData.map((data) => data.investmentValue),
          display: true,
        },
      ],
    }));
  }, [resultData, currency]);

  return (
    <div className="output-data">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((yearData, index) => (
            <tr key={index}>
              <td>{yearData.year}</td>
              <td>{yearData.investmentValue.toFixed(2)}</td>
              <td>{yearData.interest.toFixed(2)}</td>
              <td>{yearData.totalInterest.toFixed(2)}</td>
              <td>{yearData.investedCapital.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LineChart resultData={chartData} currency={currency} />
    </div>
  );
};

export default OutputData;
