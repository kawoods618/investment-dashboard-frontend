import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./StockChart.css"; // ✅ Ensure styles are imported

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return null; // ✅ Hide chart if no data

  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">📈 Stock Price Chart</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="Date" stroke="#AAAAAA" />
            <YAxis stroke="#AAAAAA" />
            <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
            <Line type="monotone" dataKey="Close" stroke="#00d4ff" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="PredictedPrice" stroke="#ff00ff" strokeWidth={3} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StockChart;
