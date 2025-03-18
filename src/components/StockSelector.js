import React, { useState, useEffect } from "react";
import axios from "axios";

const StockSelector = ({ onSelect }) => {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");

  useEffect(() => {
    axios.get("https://investment-dashboard-backend-production.up.railway.app/api/available_stocks")
      .then((response) => setStockList(response.data.stocks))
      .catch((error) => console.error("Failed to load stocks", error));
  }, []);

  const handleStockChange = (event) => {
    const ticker = event.target.value;
    setSelectedStock(ticker);
    onSelect(ticker);
  };

  return (
    <div>
      <label>Select a Stock:</label>
      <select onChange={handleStockChange} value={selectedStock}>
        <option value="">Choose a stock</option>
        {stockList.map((stock) => (
          <option key={stock} value={stock}>{stock}</option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
