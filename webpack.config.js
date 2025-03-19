module.exports = {
  devServer: {
    allowedHosts: "all",  // ✅ Fixes "Invalid Host Header"
    host: "0.0.0.0",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: false,  // ✅ Disables Hot Module Reloading (HMR)
    liveReload: false,  // ✅ Stops WebSocket connection attempts
    client: {
      webSocketURL: false, // ✅ Fully disables WebSocket auto-reconnect
    },
  },
};
