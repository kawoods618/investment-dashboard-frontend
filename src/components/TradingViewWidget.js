import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = "tradingview-widget-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [[`${symbol}|1D`]],
      "chartOnly": false,
      "width": "100%",
      "height": "400",
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
    });

    script.onerror = () => {
      console.error("🚨 TradingView script failed to load.");
    };

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, [symbol]);

  return <div ref={containerRef} className="tradingview-widget-container"></div>;
};

export default TradingViewWidget;
