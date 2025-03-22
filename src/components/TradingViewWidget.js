import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ticker || typeof ticker !== "string" || ticker.trim() === "") return;

    // Use common exchange prefixes, fallback to first
    const knownPrefixes = ["NASDAQ", "NYSE", "AMEX"];
    const formattedSymbol = `${knownPrefixes[0]}:${ticker.toUpperCase()}`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    // Chart config
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: formattedSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      container_id: "tradingview-widget"
    });

    // Clean old chart, append new
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [ticker]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div id="tradingview-widget" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default TradingViewWidget;
