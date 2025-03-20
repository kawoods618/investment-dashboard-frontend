import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!symbol || !widgetRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[symbol]],
      chartOnly: false,
      width: "100%",
      height: 500,
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      showVolume: true,
    });

    widgetRef.current.innerHTML = "";
    widgetRef.current.appendChild(script);

    return () => {
      widgetRef.current.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div ref={widgetRef}></div>
    </div>
  );
};

export default TradingViewWidget;
