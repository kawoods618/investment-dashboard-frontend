import React, { useState } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import TradingViewWidget from "./TradingViewWidget";

const API_URL = process.env.REACT_APP_API_URL || "https://investment-dashboard-backend-production.up.railway.app";

export default function Dashboard() {
    const [ticker, setTicker] = useState(""); // Empty input for flexibility
    const [selectedTicker, setSelectedTicker] = useState("AAPL"); // Default ticker
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const fetchStockData = async (tickerToFetch) => {
        if (!tickerToFetch.trim()) return; // Prevent empty queries
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/analyze?ticker=${tickerToFetch}`);
            setData(response.data.market_data);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeClick = () => {
        if (!ticker.trim()) return; // Avoid sending empty ticker
        setSelectedTicker(ticker); // Update displayed ticker
        fetchStockData(ticker); // Fetch stock data
    };

    return (
        <div className="p-6 flex flex-col gap-6 items-center justify-center">
            <Card className="w-full max-w-5xl shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle>QuantumVest AI - Smart Investment Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter Stock Ticker (e.g. TSLA, MSFT)"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        />
                        <Button onClick={handleAnalyzeClick} disabled={loading}>
                            {loading ? "Loading..." : "Analyze"}
                        </Button>
                    </div>

                    {/* Trading Chart */}
                    <TradingViewWidget symbol={selectedTicker} />

                    {/* Display AI Predictions */}
                    {prediction && (
                        <div className="mt-4 p-4 border rounded-lg bg-gray-100 shadow">
                            <h3 className="text-lg font-semibold">AI Stock Prediction</h3>
                            <p><strong>Trend:</strong> {prediction.trend}</p>
                            <p><strong>Predicted Price:</strong> ${prediction.predicted_price}</p>
                            <p><strong>Best Buy Date:</strong> {prediction.best_buy_date}</p>
                            <p><strong>Best Sell Date:</strong> {prediction.best_sell_date}</p>
                            <p><strong>Probability of Success:</strong> {prediction.probability_of_success}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
