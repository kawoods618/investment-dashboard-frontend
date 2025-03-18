import React, { useEffect, useState } from "react";
import { fetchStockData } from "../api";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const StockChart = ({ ticker }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!ticker) return;
      const data = await fetchStockData(ticker);
      setStockData(data);
    };
    getData();
  }, [ticker]);

  if (!stockData) return <p>Loading data...</p>;

  const chartData = {
    labels: stockData.market_data.map((d) => d.Date),
    datasets: [
      {
        label: `${ticker} Stock Price`,
        data: stockData.market_data.map((d) => d.Close),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>{ticker} Stock Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
