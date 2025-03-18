import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import TradingViewWidget from "./TradingViewWidget";

const API_URL = process.env.REACT_APP_API_URL || "https://investment-dashboard-backend-production.up.railway.app";

export default function Dashboard() {
    const [ticker, setTicker] = useState("AAPL");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    const fetchStockData = async () => {
        if (!ticker) return; // Prevent API calls if no ticker is entered
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/analyze?ticker=${ticker}`);
            setData(response.data.market_data);
            setPrediction(response.data.prediction);
            setRecommendation(response.data.recommendation);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
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
                        <Button onClick={fetchStockData} disabled={loading}>
                            {loading ? "Loading..." : "Analyze"}
                        </Button>
                    </div>

                    <TradingViewWidget symbol={ticker} />

                    {prediction && (
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Stock Prediction</h3>
                            <p>Trend: {prediction.trend}</p>
                            <p>Confidence: {prediction.confidence}</p>
                        </div>
                    )}

                    {recommendation && (
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Investment Recommendation</h3>
                            <p>Rating: {recommendation.rating}</p>
                            <p>Reason: {recommendation.reason}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
