import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker) return;

        // Wait until TradingView script loads
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.async = true;
        script.onload = () => console.log("✅ TradingView Widget Loaded Successfully.");
        script.onerror = () => console.error("🚨 TradingView script failed to load.");

        // Ensure TradingView container exists
        if (containerRef.current) {
            containerRef.current.innerHTML = ""; // Clear old widget
            containerRef.current.appendChild(script);
        }

    }, [ticker]);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div id="tradingview-symbol-overview"></div>
        </div>
    );
};

export default TradingViewWidget;
