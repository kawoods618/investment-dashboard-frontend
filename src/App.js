import React, { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";
import { Card } from "@/components/ui/card";

function App() {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticker) {
      fetchStockData(ticker);
    }
  }, [ticker]);

  const handleInputChange = (event) => {
    setTicker(event.target.value.toUpperCase());
  };

  const fetchStockData = (ticker) => {
    setLoading(true);
    axios
      .get(`https://investment-dashboard-backend-production-680a.up.railway.app/api/analyze?ticker=${ticker}`)
      .then((response) => {
        setLoading(false);
        if (response.data.error) {
          setPrediction(null);
          setChartData([]);
          setError(response.data.error);
        } else {
          setPrediction(response.data.prediction);
          setChartData(response.data.market_data);
          setError("");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching data.");
      });
  };

  return (
    <div className="container">
      <h1>QuantumVest AI Dashboard</h1>

      <input
        type="text"
        value={ticker}
        onChange={handleInputChange}
        placeholder="Enter stock or crypto ticker"
      />
      <button onClick={() => fetchStockData(ticker)}>Analyze</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {prediction && (
        <Card>
          <h3>Predicted Trend: {prediction.trend}</h3>
          <h4>Investment Advice: {prediction.advice}</h4>
          <h4>Confidence: {prediction.confidence}</h4>
          <h4>Predicted Prices (Next 7 Days):</h4>
          <ul>
            {prediction.predicted_prices.map((price, index) => (
              <li key={index}>Day {index + 1}: ${price}</li>
            ))}
          </ul>
          <p>Best Buy Date: {prediction.best_buy_date}</p>
          <p>Best Sell Date: {prediction.best_sell_date}</p>
        </Card>
      )}

      {chartData.length > 0 && <StockChart data={chartData} />}
    </div>
  );
}

export default App;
