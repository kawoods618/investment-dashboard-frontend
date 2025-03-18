import React, { useEffect, useState } from "react";
import { fetchStockData } from "../api";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const StockChart = ({ ticker }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!ticker) return;
      try {
        const data = await fetchStockData(ticker);
        if (!data || !data.market_data || data.market_data.length === 0) {
          setError("No stock data available.");
          setStockData(null);
        } else {
          setStockData(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch stock data.");
        setStockData(null);
      }
    };
    getData();
  }, [ticker]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
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
