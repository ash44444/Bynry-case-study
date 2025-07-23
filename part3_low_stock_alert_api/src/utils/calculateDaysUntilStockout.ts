export function calculateDaysUntilStockout(currentStock: number, avgDailySales: number): number {
  if (avgDailySales <= 0) return 9999; // practically no stockout soon
  return Math.floor(currentStock / avgDailySales);
}
