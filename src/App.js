import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StockChart from "./components/StockChart";
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
      setError("Error fetching stock data");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>QuantumVest AI - Smart Investment Assistant 🚀</h1>

      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter stock ticker..."
      />
      <button onClick={fetchStockData}>Analyze</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div>
          <h2>Predictions</h2>
          <p>Next Day: ${data.predictions?.next_day ?? "N/A"}</p>
          <p>Next Week: ${data.predictions?.next_week ?? "N/A"}</p>
          <p>Next Month: ${data.predictions?.next_month ?? "N/A"}</p>

          <h2>Stock Chart</h2>
          <StockChart marketData={data.market_data} />

          <h2>TradingView Chart</h2>
          <TradingViewWidget symbol={ticker} />
        </div>
      )}
    </div>
  );
}

export default App;
