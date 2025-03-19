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
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (ticker.length > 1) {
      fetchStockData(ticker);
    }
  }, [ticker]);

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value)) {  // ✅ Only allow valid ticker characters
      setTicker(value);
    } else {
      setError("Invalid ticker format. Use only letters and numbers.");
    }
  };

  const fetchStockData = (ticker) => {
    if (ticker.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`${BASE_URL}/analyze?ticker=${ticker}`)
      .then((response) => {
        setLoading(false);

        if (!response.data || response.data.error) {
          setPrediction(null);
          setChartData([]);
          setNews([]);
          setError(response.data?.error || "No data found.");
          return;
        }

        setPrediction(response.data.prediction);
        setChartData(response.data.market_data || []);
        setNews(response.data.prediction.financial_news || []);
      })
      .catch(() => {
        setLoading(false);
        setError("Error fetching data.");
      });
  };

  return (
    <div className="container">
      <h1 className="title">QuantumVest AI Dashboard</h1>

      <div className="input-section">
        <input
          type="text"
          value={ticker}
          onChange={handleInputChange}
          placeholder="Enter stock or crypto ticker"
          className="ticker-input"
        />
        <button onClick={() => fetchStockData(ticker)} className="analyze-button">
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
            <li>📊 <strong>Next Day:</strong> ${prediction.predicted_prices?.next_day || "N/A"}</li>
            <li>📈 <strong>Next Week:</strong> ${prediction.predicted_prices?.next_week || "N/A"}</li>
            <li>📉 <strong>Next Month:</strong> ${prediction.predicted_prices?.next_month || "N/A"}</li>
          </ul>

          <h4>Optimal Trading Strategy:</h4>
          <p>✅ Best Buy Price: <strong>${prediction.best_buy_price || "N/A"}</strong> (Date: {prediction.best_buy_date || "N/A"})</p>
          <p>📈 Best Sell Price: <strong>${prediction.best_sell_price || "N/A"}</strong> (Date: {prediction.best_sell_date || "N/A"})</p>
          <p>📊 Probability of Success: <strong>{prediction.probability_of_success || "N/A"}</strong></p>
        </div>
      )}

      {chartData.length > 0 && <StockChart data={chartData} />}

      {news.length > 0 && (
        <div className="news-section">
          <h3>📢 Market News & Insights</h3>
          <ul className="news-list">
            {news.map((article, index) => (
              <li key={index}>
                <strong>{article.title}</strong>: {article.summary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

