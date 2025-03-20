import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        // Clear any existing content in the container
        containerRef.current.innerHTML = "";

        // Create script element
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;

        // **FIXED: Properly pass configuration settings**
        script.innerHTML = JSON.stringify({
            "container_id": "tradingview_chart",
            "symbol": ticker,
            "width": "100%",
            "height": 400,
            "theme": "dark",
            "interval": "D",
            "timezone": "Etc/UTC",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "hide_volume": true
        });

        // Append the script to the container
        containerRef.current.appendChild(script);

        console.log("✅ TradingView Widget Loaded Successfully.");

        return () => {
            console.log("♻️ Cleaning up TradingView widget...");
            containerRef.current.innerHTML = ""; // Cleanup on unmount
        };
    }, [ticker]);

    return <div ref={containerRef} id="tradingview_chart" className="tradingview-widget-container" />;
};

export default TradingViewWidget;
