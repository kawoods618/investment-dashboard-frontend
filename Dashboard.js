import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TradingViewWidget from "./TradingViewWidget";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const API_URL = "https://investment-dashboard-backend-production.up.railway.app";

export default function Dashboard() {
    const [ticker, setTicker] = useState("AAPL");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStockData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/analyze?ticker=${ticker}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, []);

    return (
        <div className="p-6 flex flex-col gap-6 items-center justify-center">
            <Card className="w-full max-w-5xl shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle>AI-Powered Investment Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Enter Stock Ticker (e.g. AAPL)"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    />
                    <Button onClick={fetchStockData} disabled={loading}>
                        {loading ? "Loading..." : "Analyze"}
                    </Button>
                    <TradingViewWidget symbol={ticker} />
                </CardContent>
            </Card>
        </div>
    );
}
