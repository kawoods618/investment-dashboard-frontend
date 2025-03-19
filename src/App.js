import React, { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";
import "./App.css"; // ✅ Import styles

const BASE_URL = "https://investment-dashboard-backend-production-680a.up.railway.app/api";

function App() {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value)) {
      setTicker(value);
      setError(""); // ✅ Clear errors when input is valid
    } else {
      setError("Invalid ticker format. Use only letters and numbers.");
    }
  };

  const fetchStockData = async () => {
    if (ticker.length < 2) {
      setError("Enter a valid stock or crypto ticker.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}/analyze?ticker=${ticker}`);

      if (response.status === 404) {
        setPrediction(null);
        setChartData([]);
        setSummary("");
        setError(`No stock or crypto data found for ${ticker}. Try another ticker.`);
        return;
      }

      if (!response.data || response.data.error) {
        setPrediction(null);
        setChartData([]);
        setSummary("");
        setError(response.data?.error || "No data found.");
        return;
      }

      setPrediction(response.data.prediction);
      setChartData(response.data.market_data || []);
      setSummary(response.data.prediction.investment_summary || "");
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
        <button onClick={fetchStockData} className="analyze-button">
          Analyze
        </button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {prediction && (
        <div className="prediction-box">
          <h3 className="prediction-title">Predicted Trend: {prediction.trend || "N/A"}</h3>
          <h4 className="prediction-advice">Investment Advice: {prediction.advice || "N/A"}</h4>
          <h4>Confidence: {prediction.confidence || "N/A"}</h4>

          <h4>Predicted Prices:</h4>
          <ul className="predicted-prices">
            <li>📊 <strong>Next Day ({prediction.predicted_prices.next_day.date}):</strong> ${prediction.predicted_prices.next_day.price || "N/A"}</li>
            <li>📈 <strong>Next 7 Days ({prediction.predicted_prices.next_7_days.date}):</strong> ${prediction.predicted_prices.next_7_days.price || "N/A"}</li>
            <li>📉 <strong>Next 30 Days ({prediction.predicted_prices.next_30_days.date}):</strong> ${prediction.predicted_prices.next_30_days.price || "N/A"}</li>
          </ul>

          <h4>Optimal Trading Strategy:</h4>
          <p>✅ Best Buy Price: <strong>${prediction.best_buy_price || "N/A"}</strong> (Date: {prediction.best_buy_date || "N/A"})</p>
          <p>📈 Best Sell Price: <strong>${prediction.best_sell_price || "N/A"}</strong> (Date: {prediction.best_sell_date || "N/A"})</p>
          <p>📊 Probability of Success: <strong>{prediction.probability_of_success || "N/A"}</strong></p>
        </div>
      )}

      {chartData.length > 0 && <StockChart data={chartData} />}

      {summary && (
        <div className="summary-section">
          <h3>📢 AI Investment Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
