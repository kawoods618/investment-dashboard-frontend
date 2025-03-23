import React, { useState } from "react";
import axios from "axios";
import TradingViewWidget from "./components/TradingViewWidget";
import "./App.css";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!ticker) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://investment-dashboard-backend-production-7220.up.railway.app/api/analyze?ticker=${ticker}`
      );
      console.log("✅ API Response:", response.data);
      setData(response.data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Failed to fetch data.");
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
          placeholder="Enter Stock Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          className="ticker-input"
        />
        <button onClick={fetchStockData} className="analyze-button">
          Analyze
        </button>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <div className="data-card">
            <h3>📊 AI Predictions</h3>
            <p><strong>Next Day:</strong> ${data.predictions?.next_day}</p>
            <p><strong>Next Week:</strong> ${data.predictions?.next_week}</p>
            <p><strong>Next Month:</strong> ${data.predictions?.next_month}</p>
            <p><strong>Success Probability:</strong> {data.predictions?.probability}%</p>
          </div>

          <div className="data-card">
            <h3>📰 Market News Summary</h3>
            <p>{data.news_summary || "No news available."}</p>
          </div>

          <div className="data-card chart-card">
            <h3>📈 Stock Chart</h3>
            <TradingViewWidget ticker={ticker} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
