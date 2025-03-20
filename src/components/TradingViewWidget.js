import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = "tradingview-widget-script";

    // ✅ Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // ✅ Ensure the container exists before loading script
    if (!containerRef.current) {
      console.error("❌ TradingView container not found.");
      return;
    }

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

    // ✅ Append script AFTER container is rendered
    containerRef.current.appendChild(script);
    console.log("✅ TradingView Widget Loaded");

    return () => {
      // ✅ Cleanup script on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [ticker]);

  return <div ref={containerRef} className="tradingview-widget-container"></div>;
};

export default TradingViewWidget;
