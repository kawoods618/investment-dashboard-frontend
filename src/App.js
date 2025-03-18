import React, { useState, useEffect } from "react";

function App() {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);

  // 🔥 Fetch available stock options from the backend
  useEffect(() => {
    fetch("https://investment-dashboard-backend-production.up.railway.app/api/available_stocks")
      .then((res) => res.json())
      .then((data) => setStockList(data.stocks))
      .catch((err) => console.error("Failed to load stocks", err));
  }, []);

  // 🔥 Handle stock selection and fetch analysis
  const handleStockChange = (event) => {
    const ticker = event.target.value;
    setSelectedStock(ticker);

    fetch(`https://investment-dashboard-backend-production.up.railway.app/analyze?ticker=${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setPrediction(null);
          setChartData([]);
          alert(`Error: ${data.error}`);
        } else {
          setPrediction(data.prediction);
          setChartData(data.market_data);
        }
      })
      .catch((err) => console.error("Failed to fetch stock data", err));
  };

  return (
    <div>
      <h1>QuantumVest AI Dashboard</h1>
      
      {/* 🔥 Stock Dropdown Menu */}
      <select onChange={handleStockChange} value={selectedStock}>
        <option value="">Select a stock</option>
        {stockList.map((stock) => (
          <option key={stock} value={stock}>{stock}</option>
        ))}
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
      {chartData.length > 0 && (
        <div>
          <h2>Stock Price Chart</h2>
          <svg width="600" height="300">
            {chartData.map((point, index) => {
              const x = index * 10;
              const y = 300 - point.Close / 2;
              return <circle key={index} cx={x} cy={y} r="2" fill="blue" />;
            })}
          </svg>
        </div>
      )}
    </div>
  );
}

export default App;
