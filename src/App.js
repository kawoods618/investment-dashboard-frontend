import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TradingViewWidget from "./components/TradingViewWidget.js";
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
      setData(response.data);
      setError("");

      console.log("✅ Correct Ticker Data:", response.data); // Debugging
    } catch (err) {
      setError("Error fetching stock data. Possible CORS issue.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <motion.h1 className="text-4xl font-bold mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        QuantumVest AI 🚀
      </motion.h1>

      <div className="flex items-center space-x-4">
        <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} placeholder="Enter stock or crypto ticker..." className="p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:ring-green-500" />
        <button onClick={fetchStockData} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold">Analyze</button>
      </div>

      {loading && <p className="text-yellow-400 mt-4">Fetching data...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <motion.div className="w-full max-w-4xl mt-8 bg-gray-800 p-6 rounded-xl shadow-xl">
          <h3 className="text-2xl font-semibold text-green-400">📊 Predictions for {data.ticker}</h3>
          <p><strong>Next Day:</strong> ${data.predictions?.next_day || "N/A"}</p>
          <h3 className="text-2xl font-semibold text-blue-400 mt-4">📈 Stock Chart</h3>
          <TradingViewWidget symbol={data.ticker} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
