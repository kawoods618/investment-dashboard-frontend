import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Check for valid input
    if (!ticker || typeof ticker !== "string" || ticker.trim() === "") return;

    // Forcefully format symbol with market prefix
    const formattedSymbol = `NASDAQ:${ticker.toUpperCase()}`;

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

    // Clear previous chart
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [ticker]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div id="tradingview-widget" style={{ height: 500 }}></div>
    </div>
  );
};

export default TradingViewWidget;
