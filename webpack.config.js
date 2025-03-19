module.exports = {
  devServer: {
    allowedHosts: "all",  // ✅ Fixes "Invalid Host Header" error
    hot: false,
    liveReload: false,
    client: {
      webSocketURL: false, // ✅ Disables WebSocket auto-reconnect
    },
  },
};
