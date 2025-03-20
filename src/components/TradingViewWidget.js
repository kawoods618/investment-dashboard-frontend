import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!window.TradingView) {
      console.error("🚨 TradingView script failed to load.");
      return;
    }

    // Clear existing widget to avoid duplication
    if (container.current) {
      container.current.innerHTML = "";
    }

    new window.TradingView.widget({
      autosize: true,
      symbol: symbol || "TSLA",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      container_id: "tradingview_chart"
    });
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_chart" ref={container} className="h-96 w-full"></div>
    </div>
  );
};

export default TradingViewWidget;
