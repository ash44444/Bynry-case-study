# Database Design – Bynry Internship Case Study
## Questions to Ask Product Team (Missing Requirements)

### Inventory Threshold
- Do we need to store a minimum stock threshold per product per warehouse?
- Should low-stock alerts be per company or per warehouse?

### Pricing Model
- Can products have different prices in different warehouses or for different companies?
- Is there any discount or promotional price that we need to store?

### Bundle Products
- Are bundles fixed compositions, or can components vary dynamically?
- Do bundles have their own inventory count or just derive from component stock?

### Suppliers
- Can a supplier supply multiple companies, or is it company-specific?
- Do we need to track supplier lead times (delivery days)?

### Inventory Changes
- Should we track which user made the inventory change?
- Do we need to store the cost of inventory change?

### Data Retention
- How long should inventory history be stored?
- Do we need soft delete or permanent delete?

### Location Details
- Do warehouses have address details (city, state, country, GPS)?

---

## Indexes & Constraints Justifications

1. **UNIQUE (product_id, warehouse_id)**  
   Ensures no duplicate product entries in the same warehouse.

2. **UNIQUE (product_id, supplier_id)**  
   Prevents duplicate supplier links for the same product.

3. **CHECK (bundle_product_id != component_product_id)**  
   Avoids recursive loops in product bundles.

4. **Foreign Keys with ON DELETE CASCADE**  
   Ensures related records (inventory, bundles, etc.) are automatically cleaned when parent records are deleted.

5. **Threshold column in `product_inventory`**  
   Allows setting of warehouse-specific low-stock thresholds.

6. **Indexes on foreign keys (MySQL automatically creates)**  
   Improves performance of JOIN queries used for reports and alerts.


   ## ERD (Entity Relationship Diagram)

![ERD Diagram](docs/erd.png)





  
