// components/LineChart.js
import { Line } from "react-chartjs-2";

function LineChart({ resultData, currency }) {
  return (
    <div className="chart-container">
      <Line
        data={resultData}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: currency.toUpperCase(),
                align: "center",
                padding: "15",
                font: {
                  size: 15,
                  weight: "bold",
                }
              },
            },
            x: {
              title: {
                display: true,
                text: "Years",
                align: "center",
                padding: "15",
                font: {
                  size: 15,
                  weight: "bold",
                }
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Investment Growth",
              font: {
                size: 25,
                weight: "bold",
              }

            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
