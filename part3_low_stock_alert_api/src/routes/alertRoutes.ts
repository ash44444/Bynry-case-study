import { Router } from "express";
import { lowStockAlertsHandler } from "../controllers/alertController";

const router = Router();
router.get("/companies/:company_id/alerts/low-stock", lowStockAlertsHandler);

export default router;
