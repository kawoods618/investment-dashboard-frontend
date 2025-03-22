import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ticker || typeof ticker !== "string" || ticker.trim() === "") return;

    // Known safe fallback exchange prefixes
    const knownPrefixes = ["NASDAQ", "NYSE", "AMEX"];

    // Try with default prefix — fallback to raw ticker if needed
    const formattedSymbol = `${knownPrefixes[0]}:${ticker.toUpperCase()}`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
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

    // Clear old widget and add new one
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
      <div id="tradingview-widget" style={{ height: 500 }}></div>
    </div>
  );
};

export default TradingViewWidget;
