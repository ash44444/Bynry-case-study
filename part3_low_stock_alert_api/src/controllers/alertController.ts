import { Request, Response } from "express";
import { getLowStockAlerts } from "../services/alertService";

export async function lowStockAlertsHandler(req: Request, res: Response) {
  const companyId = parseInt(req.params.company_id, 10);
  if (isNaN(companyId)) {
    return res.status(400).json({ error: "Invalid company_id" });
  }

  try {
    const data = await getLowStockAlerts(companyId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
