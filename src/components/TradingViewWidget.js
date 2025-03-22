import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ticker) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: ticker,
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

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, [ticker]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div id="tradingview-widget" style={{ height: 500 }}></div>
    </div>
  );
};

export default TradingViewWidget;
