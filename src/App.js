import React, { useState } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";

function App() {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setTicker(event.target.value.toUpperCase());
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!ticker) {
      setError("Please enter a ticker symbol.");
      return;
    }
    setError("");
    fetchStockData(ticker);
  };

  const fetchStockData = (ticker) => {
    axios
      .get(`https://investment-dashboard-backend-production-680a.up.railway.app/analyze?ticker=${ticker}`)
      .then((response) => {
        if (response.data.error) {
          setPrediction(null);
          setError(response.data.error);
        } else {
          setPrediction(response.data.prediction);
          setError("");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch stock data", error);
        setError("An error occurred while fetching data.");
      });
  };

  return (
    <div>
      <h1>QuantumVest AI Dashboard</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={ticker}
          onChange={handleInputChange}
          placeholder="Enter stock or crypto ticker"
        />
        <button type="submit">Analyze</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      {prediction && <StockChart ticker={ticker} />}
    </div>
  );
}

export default App;
