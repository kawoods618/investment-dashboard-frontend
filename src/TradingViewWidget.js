import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": symbol || "AAPL",
      "width": "100%",
      "height": "400",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true
    });

    container.current.appendChild(script);

    return () => {
      container.current.innerHTML = "";
    };
  }, [symbol]);

  return <div ref={container} />;
};

export default TradingViewWidget;
