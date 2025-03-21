import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        // Ensure the container is cleared before adding the new script
        containerRef.current.innerHTML = "";

        // Create a new div for TradingView
        const widgetDiv = document.createElement("div");
        widgetDiv.id = "tradingview_widget";

        // Append the new div to the container
        containerRef.current.appendChild(widgetDiv);

        // Create and append the script
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "container_id": "tradingview_widget",
            "symbol": ticker,
            "width": "100%",
            "height": "400",
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

        widgetDiv.appendChild(script);

        console.log("✅ TradingView Widget Loaded Successfully.");

        return () => {
            console.log("♻️ Cleaning up TradingView widget...");
            containerRef.current.innerHTML = ""; // Cleanup on unmount
        };
    }, [ticker]);

    return <div ref={containerRef} className="tradingview-widget-container" />;
};

export default TradingViewWidget;
