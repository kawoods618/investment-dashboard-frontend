import React from "react";

const StockSelector = ({ setTicker }) => {
  const handleChange = (event) => {
    setTicker(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="AAPL">Apple (AAPL)</option>
      <option value="MSFT">Microsoft (MSFT)</option>
      <option value="TSLA">Tesla (TSLA)</option>
      <option value="NVDA">NVIDIA (NVDA)</option>
      <option value="GOOGL">Google (GOOGL)</option>
    </select>
  );
};

export default StockSelector;
