import { useEffect, useRef } from "react";

const TradingViewWidget = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!ticker || !containerRef.current) return;

        // Remove previous widget to prevent duplication
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
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
        console.log("✅ TradingView Widget Loaded Successfully.");
    }, [ticker]);

    return <div ref={containerRef} className="tradingview-widget-container" />;
};

export default TradingViewWidget;
