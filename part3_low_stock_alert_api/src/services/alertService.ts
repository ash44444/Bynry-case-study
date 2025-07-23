import { pool } from "../config/db";
import { calculateDaysUntilStockout } from "../utils/calculateDaysUntilStockout";

export async function getLowStockAlerts(companyId: number) {
  const client = await pool.connect();
  try {
    // 1. Get products and inventory below threshold with recent sales (last 30 days)
    const query = `
      SELECT p.id as product_id, p.name as product_name, p.sku,
             w.id as warehouse_id, w.name as warehouse_name,
             i.quantity as current_stock, p.threshold,
             s.id as supplier_id, s.name as supplier_name, s.contact_email,
             COALESCE(avg_sales.avg_daily_sales, 0) as avg_daily_sales
      FROM inventory i
      JOIN products p ON p.id = i.product_id
      JOIN warehouses w ON w.id = i.warehouse_id
      JOIN suppliers s ON s.id = p.supplier_id
      LEFT JOIN (
        SELECT product_id, warehouse_id, AVG(quantity) as avg_daily_sales
        FROM sales
        WHERE sale_date > NOW() - INTERVAL '30 days'
        GROUP BY product_id, warehouse_id
      ) avg_sales
      ON avg_sales.product_id = i.product_id AND avg_sales.warehouse_id = i.warehouse_id
      WHERE w.company_id = $1 AND i.quantity < p.threshold
    `;
    const result = await client.query(query, [companyId]);

    // 2. Calculate days until stockout and format result
    const alerts = result.rows.map(row => ({
      product_id: row.product_id,
      product_name: row.product_name,
      sku: row.sku,
      warehouse_id: row.warehouse_id,
      warehouse_name: row.warehouse_name,
      current_stock: row.current_stock,
      threshold: row.threshold,
      days_until_stockout: calculateDaysUntilStockout(row.current_stock, row.avg_daily_sales),
      supplier: {
        id: row.supplier_id,
        name: row.supplier_name,
        contact_email: row.contact_email
      }
    }));

    return { alerts, total_alerts: alerts.length };
  } finally {
    client.release();
  }
}
