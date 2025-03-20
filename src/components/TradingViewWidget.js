import React, { useEffect, useRef, useState } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    // Clear previous widget if already loaded
    containerRef.current.innerHTML = "";

    // Prevent duplicate script injection
    if (widgetLoaded) return;

    setTimeout(() => {
      if (!containerRef.current) return;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;

      script.onerror = () => console.error("🚨 TradingView script failed to load.");
      script.onload = () => {
        console.log("✅ TradingView Widget Loaded Successfully.");
        setWidgetLoaded(true);
      };

      script.innerHTML = JSON.stringify({
        symbol: `NASDAQ:${symbol}`,
        width: "100%",
        height: 450,
        locale: "en",
        colorTheme: "dark",
        autosize: true
      });

      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    }, 500); // Small delay to ensure the DOM is ready

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Cleanup previous widgets
      }
    };
  }, [symbol, widgetLoaded]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
