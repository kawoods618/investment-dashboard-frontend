import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = "tradingview-widget-script";

    // ✅ Ensure container exists before proceeding
    if (!containerRef.current) {
      console.error("❌ TradingView container not found.");
      return;
    }

    // ✅ Remove any existing TradingView scripts to prevent duplication
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // ✅ Create a new script dynamically
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [[ticker]],
      chartOnly: false,
      width: "100%",
      height: "500",
      locale: "en",
      colorTheme: "dark",
      gridLineColor: "#2B2B2B",
      trendLineColor: "#00FF00",
      fontColor: "#FFFFFF",
      underLineColor: "#00FF00",
      isTransparent: false,
      autosize: true,
      showVolume: true,
    });

    // ✅ Append the script to the container
    containerRef.current.appendChild(script);

    console.log("✅ TradingView Widget Loaded Successfully.");

    return () => {
      // ✅ Cleanup the script when the component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [ticker]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
