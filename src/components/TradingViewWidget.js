i  "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
    });

    // Append script only if container exists
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup: Remove script on unmount or symbol change
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef} className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget
