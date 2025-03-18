import axios from "axios";

export const fetchStockData = async (ticker) => {
  try {
    const response = await axios.get(
      `https://investment-dashboard-backend-production.up.railway.app/analyze?ticker=${ticker}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
