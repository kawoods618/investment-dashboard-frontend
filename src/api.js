import { BACKEND_URL } from "./config";

export const fetchStockData = async (ticker) => {
  try {
    const response = await fetch(`${BACKEND_URL}/analyze?ticker=${ticker}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
