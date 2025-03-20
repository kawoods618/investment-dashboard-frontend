import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    // Ensure previous widget is removed before inserting a new one
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Dynamically create the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => console.log("✅ TradingView Widget Loaded");

    script.innerHTML = JSON.stringify({
      "symbol": symbol ? `NASDAQ:${symbol}` : "NASDAQ:AAPL",
      "width": "100%",
      "height": 450,
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
    });

    // Append script only if container exists
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup: Remove script on unmount or symbol change
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef} className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
