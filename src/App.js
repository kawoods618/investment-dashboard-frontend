import React, { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";
import "./App.css";

const BASE_URL = "https://investment-dashboard-backend-production.up.railway.app/api";

function App() {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState("");

  useEffect(() => {
    if (ticker.length >= 2) {
      fetchStockData();
    } else {
      setError(""); // ✅ Clear error if input is less than 2 characters
    }
  }, [ticker]);

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value)) {
      setTicker(value);
      setError("");
    } else {
      setError("Invalid ticker format. Use only letters and numbers.");
    }
  };

  const fetchStockData = async () => {
    if (ticker.length < 2) {
      return; // ✅ Prevent error message from showing when typing only one letter
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}/analyze?ticker=${ticker}`);

      if (!response.data || response.data.error) {
        setPrediction(null);
        setChartData([]);
        setNews("");
        setError(response.data?.error || `No stock data found for ${ticker}. Try another ticker.`);
        return;
      }

      setPrediction(response.data.prediction);
      setChartData(response.data.market_data || []);
      setNews(response.data.prediction?.summary || ""); // ✅ Updated from investment_summary to summary
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">QuantumVest AI</h1>

      <div className="input-section">
        <input
          type="text"
          value={ticker}
          onChange={handleInputChange}
          placeholder="Enter stock or crypto ticker"
          className="ticker-input"
        />
        <button onClick={fetchStockData} className="analyze-button" disabled={ticker.length < 2}>
          Analyze
        </button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {prediction && (
        <div className="prediction-box">
          <h3 className="prediction-title">Predicted Trend: {prediction?.trend ?? "N/A"}</h3>
          <h4 className="prediction-advice">Investment Advice: {prediction?.advice ?? "N/A"}</h4>
          <h4>Confidence: {prediction?.confidence ?? "N/A"}</h4>

          <h4>Predicted Prices:</h4>
          <ul className="predicted-prices">
            <li>📊 <strong>Next Day:</strong> ${prediction?.next_day ?? "N/A"}</li>
            <li>📈 <strong>Next Week:</strong> ${prediction?.next_7_days ?? "N/A"}</li>
            <li>📉 <strong>Next Month:</strong> ${prediction?.next_30_days ?? "N/A"}</li>
          </ul>

          <h4>Optimal Trading Strategy:</h4>
          <p>✅ Best Buy Price: <strong>${prediction?.best_buy_price ?? "N/A"}</strong> (Date: {prediction?.best_buy_date ?? "N/A"})</p>
          <p>📈 Best Sell Price: <strong>${prediction?.best_sell_price ?? "N/A"}</strong> (Date: {prediction?.best_sell_date ?? "N/A"})</p>
          <p>📊 Probability of Success: <strong>{prediction?.probability_of_success ?? "N/A"}</strong></p>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="stock-chart-container">
          <StockChart data={chartData} />
        </div>
      )}

      {news && (
        <div className="news-section">
          <h3>📢 AI Market Summary</h3>
          <p>{news}</p>
        </div>
      )}
    </div>
  );
}

export default App;
