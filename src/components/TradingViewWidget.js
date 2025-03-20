import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol ? `NASDAQ:${symbol}` : "NASDAQ:AAPL",
      width: "100%",
      height: 450,
      locale: "en",
      colorTheme: "dark",
      autosize: true,
    });

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [symbol]);

  return <div ref={containerRef} />;
};

export default TradingViewWidget;
