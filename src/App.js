import React, { useState, useEffect } from "react";
import axios from "axios";
import TradingViewWidget from "./components/TradingViewWidget";

const App = () => {
    const [ticker, setTicker] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch stock data from the backend
    const fetchStockData = async () => {
        if (!ticker) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://investment-dashboard-backend-production-7220.up.railway.app/api/analyze?ticker=${ticker}`
            );
            console.log("✅ API Response:", response.data);
            setData(response.data);
        } catch (err) {
            console.error("❌ API Error:", err);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">QuantumVest AI</h1>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter Stock Ticker (e.g., AAPL)"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    className="ticker-input"
                />
                <button onClick={fetchStockData} className="analyze-button">Analyze</button>
            </div>

            {loading && <p>Loading data...</p>}
            {error && <p className="error">{error}</p>}

            {data && (
                <>
                    <h2>📊 AI Predictions</h2>
                    <p><strong>Next Day:</strong> ${data.predictions?.next_day}</p>
                    <p><strong>Next Week:</strong> ${data.predictions?.next_week}</p>
                    <p><strong>Next Month:</strong> ${data.predictions?.next_month}</p>

                    <h2>🎯 Investment Suggestions</h2>
                    <p><strong>Recommendation:</strong> {data.predictions?.recommendation || "N/A"}</p>
                    <p><strong>Suggested Buy Date:</strong> {data.predictions?.buy_date || "N/A"}</p>
                    <p><strong>Suggested Sell Date:</strong> {data.predictions?.sell_date || "N/A"}</p>
                    <p><strong>Probability of Success:</strong> {data.predictions?.probability_of_success
                        ? `${data.predictions.probability_of_success}%`
                        : "N/A"}
                    </p>

                    <h2>📰 Market News</h2>
                    <p>{data.news_summary || "No recent news found."}</p>

                    <h2>📈 Stock Chart</h2>
                    <TradingViewWidget ticker={ticker} />
                </>
            )}
        </div>
    );
};

export default App;
