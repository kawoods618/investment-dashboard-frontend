import React, { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "./components/StockChart"; // Import the new chart component

function App() {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);

  // 🔥 Fetch available stock options from backend
  useEffect(() => {
    axios.get("https://investment-dashboard-backend-production.up.railway.app/api/available_stocks")
      .then((response) => setStockList(response.data.stocks))
      .catch((error) => console.error("Failed to load stocks", error));
  }, []);

  // 🔥 Handle stock selection and fetch analysis
  const handleStockChange = (event) => {
    const ticker = event.target.value;
    setSelectedStock(ticker);

    axios.get(`https://investment-dashboard-backend-production.up.railway.app/analyze?ticker=${ticker}`)
      .then((response) => {
        if (response.data.error) {
          setPrediction(null);
          setChartData([]);
          alert(`Error: ${response.data.error}`);
        } else {
          setPrediction(response.data.prediction);
          setChartData(response.data.market_data);
        }
      })
      .catch((error) => console.error("Failed to fetch stock data", error));
  };

  return (
    <div>
      <h1>QuantumVest AI Dashboard</h1>

      {/* 🔥 Stock Dropdown Menu */}
      <select onChange={handleStockChange} value={selectedStock}>
        <option value="">Select a stock</option>
        {stockList.map((stock) => (
          <option key={stock} value={stock}>{stock}</option>
        ))}
      </select>

      {/* 🔥 AI Predictions Display */}
      {prediction && (
        <div>
          <h3>Predicted Trend: {prediction.trend}</h3>
          <h4>Predicted Prices (Next 7 Days):</h4>
          <ul>
            {prediction.predicted_prices.map((price, index) => (
              <li key={index}>Day {index + 1}: ${price}</li>
            ))}
          </ul>
          <p>Confidence: {prediction.confidence}</p>
          <p>Best Buy Date: {prediction.best_buy_date}</p>
          <p>Best Sell Date: {prediction.best_sell_date}</p>
        </div>
      )}

      {/* 🔥 Stock Price Chart */}
      {chartData.length > 0 && <StockChart data={chartData} />}
    </div>
  );
}

export default App;
