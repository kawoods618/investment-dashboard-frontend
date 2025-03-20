import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.onload = () => console.log("✅ TradingView Widget Loaded Successfully.");
        script.onerror = () => console.error("🚨 TradingView script failed to load.");
        
        containerRef.current.appendChild(script);
    }, [ticker]);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div id="tradingview-advanced-chart"></div>
        </div>
    );
};

export default TradingViewWidget;
