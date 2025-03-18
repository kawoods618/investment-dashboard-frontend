import React, { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "./components/StockChart"; // ✅ Ensure this exists

function App() {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    console.log("Fetching available stocks...");
    axios.get("https://investment-dashboard-backend-production-680a.up.railway.app/api/available_stocks")
      .then((response) => {
        console.log("Available stocks received:", response.data);
        setStockList(response.data.stocks);
      })
      .catch((error) => {
        console.error("Failed to load stocks", error);
      });
  }, []);

  const handleStockChange = (event) => {
    const ticker = event.target.value;
    setSelectedStock(ticker);

    console.log(`Fetching stock analysis for ${ticker}...`);
    axios.get(`https://investment-dashboard-backend-production-680a.up.railway.app/analyze?ticker=${ticker}`)
      .then((response) => {
        if (response.data.error) {
          setPrediction(null);
          alert(`Error: ${response.data.error}`);
        } else {
          console.log("Stock analysis received:", response.data);
          setPrediction(response.data.prediction);
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
        {stockList.length > 0 ? (
          stockList.map((stock) => (
            <option key={stock} value={stock}>{stock}</option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
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
      {selectedStock && <StockChart ticker={selectedStock} />}
    </div>
  );
}

export default App;
