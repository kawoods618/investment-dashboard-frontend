import React, { useEffect, useRef, useState } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    // Ensure the script is not loaded multiple times
    const scriptId = "tradingview-widget-script";
    if (document.getElementById(scriptId)) {
      document.getElementById(scriptId).remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol.toUpperCase(),
      width: "100%",
      height: 500,
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      showVolume: true,
      container_id: "tradingview-widget"
    });

    script.onload = () => {
      console.log("✅ TradingView Widget Loaded");
      setWidgetLoaded(true);
    };

    script.onerror = () => {
      console.error("🚨 TradingView script failed to load.");
    };

    containerRef.current.appendChild(script);

    // Cleanup function to remove script on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef} id="tradingview-widget"></div>
      {!widgetLoaded && <p className="text-yellow-400 mt-4">📉 Loading chart...</p>}
    </div>
  );
};

export default TradingViewWidget;
