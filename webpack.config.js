module.exports = {
  devServer: {
    allowedHosts: "all",  // ✅ Fixes "Invalid Host Header"
    host: "0.0.0.0",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: false,
    liveReload: false,
    client: {
      webSocketURL: false, // ✅ Disables WebSocket auto-reconnect
    },
  },
};
