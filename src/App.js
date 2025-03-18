import React, { useState } from "react";
import StockChart from "./components/StockChart";
import StockSelector from "./components/StockSelector";

function App() {
  const [ticker, setTicker] = useState("AAPL"); // Default to AAPL

  return (
    <div>
      <h1>QuantumVest AI Dashboard</h1>
      <StockSelector setTicker={setTicker} />
      <StockChart ticker={ticker} />
    </div>
  );
}

export default App;
