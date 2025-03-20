import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Remove any existing widget before creating a new one
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Wait for the DOM to be ready before inserting the widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => console.log("TradingView Widget Loaded");

    script.innerHTML = JSON.stringify({
      "symbol": symbol ? `NASDAQ:${symbol}` : "NASDAQ:AAPL",
      "width": "100%",
      "height": 450,
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
    });

    // Append script only if the containerRef is available
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
