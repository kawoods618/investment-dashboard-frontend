import React, { useState } from "react";
import axios from "axios";
import TradingViewWidget from "./components/TradingViewWidget";

const App = () => {
    const [ticker, setTicker] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchStockData = async () => {
        if (!ticker) return;
        setError("");
        setData(null);
        
        try {
            const response = await axios.get(`https://investment-dashboard-backend-production-7220.up.railway.app/api/analyze?ticker=${ticker}`);
            console.log("✅ API Response:", response.data);
            setData(response.data);
        } catch (err) {
            console.error("❌ API Error:", err);
            setError("Failed to fetch stock data.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">QuantumVest AI</h1>
            
            <div className="input-section">
                <input 
                    type="text"
                    className="ticker-input"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Enter Stock Ticker (e.g., TSLA)"
                />
                <button className="analyze-button" onClick={fetchStockData}>Analyze</button>
            </div>

            {error && <p className="error">{error}</p>}

            {data && (
                <div>
                    <h2>📊 AI Predictions</h2>
                    <p>Next Day: ${data.predictions.next_day || "N/A"}</p>
                    <p>Next Week: ${data.predictions.next_week || "N/A"}</p>
                    <p>Next Month: ${data.predictions.next_month || "N/A"}</p>

                    <h2>📰 Market News Summary</h2>
                    <p>{data.news_summary}</p>

                    <h2>📈 Stock Chart</h2>
                    <TradingViewWidget ticker={data.ticker} />
                </div>
            )}
        </div>
    );
};

export default App;
