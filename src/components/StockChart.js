import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const StockChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData(null);
      return;
    }

    // Prepare data for Chart.js
    const formattedData = {
      labels: data.map((point) => point.Date),
      datasets: [
        {
          label: "Stock Price (Close)",
          data: data.map((point) => point.Close),
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    setChartData(formattedData);
  }, [data]);

  if (!chartData) {
    return <p style={{ color: "red" }}>No stock data available for this ticker.</p>;
  }

  return (
    <div>
      <h2>Stock Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
