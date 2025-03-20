import React, { useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import axios from "axios";

function App() {
    const [ticker, setTicker] = useState("");  // ✅ Default state is empty, not "TSLA"
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        if (!ticker.trim()) {
            setError("Please enter a stock or crypto ticker.");
            return;
        }
        
        try {
            const response = await axios.get(`https://investment-dashboard-backend-production-7220.up.railway.app/api/analyze?ticker=${ticker}`);
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("❌ API Error:", err);
            setError("Failed to fetch data. Please check the ticker or try again later.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">
                <span style={{ fontSize: "3rem", fontWeight: "bold", background: "linear-gradient(90deg, #ff00ff, #00ffff)", WebkitBackgroundClip: "text", color: "transparent" }}>
                    QuantumVest AI
                </span>
            </h1>

            <div className="input-section">
                <input 
                    type="text" 
                    value={ticker} 
                    onChange={(e) => setTicker(e.target.value.toUpperCase())} 
                    className="ticker-input"
                    placeholder="Enter Ticker Symbol..."
                />
                <button onClick={fetchStockData} className="analyze-button">Analyze</button>
            </div>

            {error && <p className="error">{error}</p>}

            {data && (
                <div className="results">
                    <h2>📊 AI Predictions</h2>
                    <p>Next Day: ${data.predictions?.next_day ?? "N/A"}</p>
                    <p>Next Week: ${data.predictions?.next_week ?? "N/A"}</p>
                    <p>Next Month: ${data.predictions?.next_month ?? "N/A"}</p>

                    <h2>📰 Market Insights</h2>
                    <p>{data.news_summary || "No financial insights available."}</p>

                    <h2>📈 Stock Chart</h2>
                    <TradingViewWidget ticker={ticker} />
                </div>
            )}
        </div>
    );
}

export default App;
