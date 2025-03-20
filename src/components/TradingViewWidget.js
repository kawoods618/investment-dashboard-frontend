import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        // Clear any existing content before adding a new widget
        containerRef.current.innerHTML = "";

        // Create script tag for TradingView widget
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.onload = () => console.log("✅ TradingView Widget Loaded Successfully.");
        script.onerror = () => console.error("🚨 TradingView script failed to load.");

        script.innerHTML = JSON.stringify({
            symbol: ticker,
            width: "100%",
            height: 400,
            theme: "dark",
            interval: "D",
            timezone: "Etc/UTC",
            style: "1",
            locale: "en",
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: true,
            save_image: false,
            hide_volume: true
        });

        containerRef.current.appendChild(script);
    }, [ticker]);

    return <div ref={containerRef} className="tradingview-widget-container" />;
};

export default TradingViewWidget;
