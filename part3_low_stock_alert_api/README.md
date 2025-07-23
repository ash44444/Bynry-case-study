# Low Stock Alert API – Bynry Internship Case Study

## Overview
This project implements an API endpoint to return low-stock alerts for products of a company.  
The solution is built using **Node.js, Express, TypeScript, and PostgreSQL** following an **MVC pattern**.

---

## Endpoint Implemented
### `GET /api/companies/:company_id/alerts/low-stock`

### **Response Format**
```json
{
  "alerts": [
    {
      "product_id": 1,
      "product_name": "Widget A",
      "sku": "WID-001",
      "warehouse_id": 1,
      "warehouse_name": "Main Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 12,
      "supplier": {
        "id": 1,
        "name": "Supplier Corp",
        "contact_email": "orders@supplier.com"
      }
    }
  ],
  "total_alerts": 1
}
```

---

## Approach
1. **Architecture:**  
   - **Express + TypeScript** used for backend server.  
   - **MVC Pattern**: routes → controllers → services → database layer.  
   - **PostgreSQL** used as the database with connection pooling (`pg` module).  

2. **Logic:**  
   - Fetch products below their stock threshold.  
   - Join warehouses, suppliers, and sales data for enriched details.  
   - Calculate `days_until_stockout` using average daily sales from the last 30 days.  
   - Return response strictly in the required format.

3. **Database Tables (assumed):**  
   - `companies`, `warehouses`, `products`, `suppliers`, `inventory`, `sales`.

---

## Edge Cases Handled
### 1. Invalid `company_id`
- If the provided `company_id` is invalid or not a number,  
  the API returns:
```json
{ "error": "Invalid company_id" }
```
with status **400 Bad Request**.

### 2. No Low Stock Products
- If no product is below threshold,  
  the API returns:
```json
{ "alerts": [], "total_alerts": 0 }
```

### 3. Sales Data Missing
- If no recent sales (last 30 days) exist for a product:  
  - `avg_daily_sales = 0`
  - `days_until_stockout = Infinity`

### 4. Database Query Failure
- If database query fails,  
  the API returns:
```json
{ "error": "Internal server error" }
```
with status **500 Internal Server Error**.

### 5. Threshold Not Set for Product
- If threshold is missing (NULL), a default value of **0** is assumed,  
  meaning no low-stock alert is triggered for that product.

---

## Assumptions
- Each product has one supplier.  
- Threshold is defined per product (else treated as 0).  
- Low stock alert is company-specific (warehouse filtering by company).  
- "Recent sales activity" means last 30 days.  
- If no sales history exists, stockout estimation uses `Infinity`.

---

## Steps to Run
1. **Clone Repo & Install**
   ```bash
   npm install
   ```
2. **Setup Database**
   - Create database and run SQL migrations/schema.
3. **Environment Variables (`.env`)**
   ```
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=inventorydb
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000
   ```
4. **Start App**
   ```bash
   npm run dev
   ```
5. **Test in Postman**
   ```
   GET http://localhost:80800/api/companies/1/alerts/low-stock
   ```

---

## Tools & Libraries
- **Node.js, Express, TypeScript**
- **pg (PostgreSQL driver)**
- **dotenv** (environment variables)
- **ts-node-dev** (development server)

---

## Author
**Your Name** – Bynry Backend Internship Case Study Submission
