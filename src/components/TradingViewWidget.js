import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker) return;

        // Remove previous script if it exists
        const oldScript = document.getElementById("tradingview-script");
        if (oldScript) {
            oldScript.remove();
        }

        // TradingView Widget Script
        const script = document.createElement("script");
        script.id = "tradingview-script";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": ticker,
            "width": "100%",
            "height": "500",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "container_id": "tradingview_advanced_chart"
        });

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
            <div id="tradingview_advanced_chart"></div>
        </div>
    );
};

export default TradingViewWidget;
