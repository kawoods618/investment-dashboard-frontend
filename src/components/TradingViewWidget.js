import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        // Clear previous widget
        containerRef.current.innerHTML = "";

        // Create the script element
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": ticker,
            "width": "100%",
            "height": 500,
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "tradingview-widget"
        });

        script.onload = () => console.log(`✅ TradingView Widget Loaded for ${ticker}`);
        script.onerror = () => console.error("🚨 TradingView script failed to load.");

        // Append script to container
        containerRef.current.appendChild(script);

    }, [ticker]);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div id="tradingview-widget"></div>
        </div>
    );
};

export default TradingViewWidget;
