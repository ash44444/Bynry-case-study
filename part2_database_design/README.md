1. Questions to Ask the Product Team (Missing Requirements)

Inventory Threshold:
  Do we need to store a minimum stock threshold per product per warehouse?
  Should low-stock alerts be per company or per warehouse?

Pricing Model:
  Can products have different prices in different warehouses or for different companies?
  Is there any discount or promotional price that we need to store?

Bundle Products:
  Are bundles fixed compositions, or can components vary dynamically?
  Do bundles have their own inventory count or just derive from component stock?

Suppliers:
  Can a supplier supply multiple companies, or is it company-specific?
  Do we need to track supplier lead times (delivery days)?

Inventory Changes:
  Should we track which user made the inventory change?
  Do we need to store the cost of inventory change?

Data Retention:
  How long should inventory history be stored?
  Do we need soft delete or permanent delete?

Location Details:
  Do warehouses have address details (city, state, country, GPS)?

2.Indexes & Constraints Justifications
UNIQUE (product_id, warehouse_id) → ensures no duplicate product entries in the same warehouse.
UNIQUE (product_id, supplier_id) → prevents duplicate supplier links.
CHECK (bundle_product_id != component_product_id) → avoids recursive loops in bundles.
Foreign Keys with ON DELETE CASCADE → ensures cleanup of dependent data when parent is deleted.
Threshold column in product_inventory → allows warehouse-level low-stock configuration.
Indexes on foreign keys (automatically created in MySQL) → improves JOIN query performance.

  
