import React, { useState } from "react";
import axios from "axios";
import TradingViewWidget from "./components/TradingViewWidget";
import "./App.css";

const BASE_URL = "https://investment-dashboard-backend-production-7220.up.railway.app/api";

function App() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!ticker) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/analyze?ticker=${ticker}`);
      console.log("✅ API Response:", response.data);
      setData(response.data);
      setError("");
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Error fetching stock data");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">QuantumVest AI</h1>

      <div className="input-section">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock or crypto ticker..."
          className="ticker-input"
        />
        <button onClick={fetchStockData} className="analyze-button">
          Analyze
        </button>
      </div>

      {loading && <p className="text-yellow-400">Fetching data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="data-section">
          <h3>📊 AI Predictions</h3>
          <p><strong>Next Day:</strong> ${data.predictions?.next_day || "N/A"}</p>
          <p><strong>Next Week:</strong> ${data.predictions?.next_week || "N/A"}</p>
          <p><strong>Next Month:</strong> ${data.predictions?.next_month || "N/A"}</p>

          <h3>📈 Stock Chart</h3>
          <TradingViewWidget symbol={ticker} />

          <h3>📰 Market News</h3>
          <ul>
            {data.news.length > 0 ? (
              data.news.map((news, idx) => (
                <li key={idx}>{news.title} - {news.summary}</li>
              ))
            ) : (
              <p>No news available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
