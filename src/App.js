import React, { useState, useEffect } from "react";
import axios from "axios";
import TradingViewWidget from "./TradingViewWidget";
import "./App.css";

const BASE_URL = "https://investment-dashboard-backend-production-680a.up.railway.app/api";

function App() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    if (!ticker) return;
    try {
      const response = await axios.get(`${BASE_URL}/analyze?ticker=${ticker}`);
      setData(response.data);
    } catch (err) {
      setError("Error fetching stock data");
    }
  };

  return (
    <div className="container">
      <input type="text" onChange={(e) => setTicker(e.target.value.toUpperCase())} placeholder="Enter Ticker" />
      <button onClick={fetchStockData}>Analyze</button>

      {data && (
        <div>
          <h3>Prediction: Next Day - ${data.predictions.next_day}</h3>
          <TradingViewWidget symbol={ticker} />
          
          <h4>📢 Congress Trading</h4>
          <ul>
            {data.congress_trades.map((trade, idx) => (
              <li key={idx}>{trade.Representative} bought {trade.Volume} shares</li>
            ))}
          </ul>

          <h4>📰 Sentiment Analysis</h4>
          <ul>
            {data.news_sentiment.map((news, idx) => (
              <li key={idx}>{news.title} - Sentiment: {news.sentiment}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default App;
