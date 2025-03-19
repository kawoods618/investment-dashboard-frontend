module.exports = {
  devServer: {
    allowedHosts: "all",  // ✅ Fixes "Invalid Host Header"
    host: "0.0.0.0",
    port: 8080,
    hot: false,
    liveReload: false,
    client: {
      webSocketURL: false, // ✅ Disables WebSocket auto-reconnect
    },
  },
};
