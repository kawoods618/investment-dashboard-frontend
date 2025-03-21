import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ticker || !containerRef.current) return;

    containerRef.current.innerHTML = ""; // Clear previous chart

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: ticker,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      details: true,
      studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies"],
    });

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
      console.log("♻️ Cleaned up TradingView chart.");
    };
  }, [ticker]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: 500 }}>
      <div id="tradingview-chart" />
    </div>
  );
};

export default TradingViewWidget;
