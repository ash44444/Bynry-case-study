-- MySQL Schema Design for Bynry Backend Case Study

/*
-----------------------------------------------------
PART 1: CLEAN ERD STRUCTURE (TEXT REPRESENTATION)
-----------------------------------------------------

Company ──< Warehouse ──< ProductInventory >── Product ──< ProductBundleItems
                               │                      │
                               │                      └── ProductSuppliers >── Supplier
                               └── InventoryHistory
*/

/*
-----------------------------------------------------
PART 2: SQL CREATE TABLE STATEMENTS (MySQL)
-----------------------------------------------------
*/



/*
-----------------------------------------------------
PART 3: QUESTIONS FOR PRODUCT TEAM (MISSING INFO)
-----------------------------------------------------
*/
/*
1. Should bundle pricing be set manually or auto-calculated from components?
2. Should each warehouse track inventory threshold (min/max)?
3. Are inventory reasons (e.g., SALE, RETURN) predefined or custom text?
4. Can a supplier serve multiple companies, or just one?
5. Do products have variants (color, size) or only base SKUs?
 6. Should deleted products/warehouses be soft-deleted?
7. Should we track which user made an inventory change (audit trail)?
8. Should inventory changes be reversible (undo/correct)?

/*
-----------------------------------------------------
PART 4: DESIGN JUSTIFICATIONS
-----------------------------------------------------
*/

Used separate product_inventory table to support many-to-many relationships between products and warehouses.
 Used ENUM for inventory change types for consistency and indexing.
Used UNIQUE constraints (e.g., SKU, product-warehouse pair) to avoid duplicates.
Used composite keys in mapping tables to ensure clean linkage.
 Used CHECK constraints to avoid invalid bundle self-references.
 Used timestamps to support auditing and reporting.
All foreign keys are indexed by default in MySQL for faster joins.

 Easy integration with Express.js backend using Knex.js or Sequelize ORM.
 Scalable schema supports adding more metadata later (e.g., stock thresholds, warehouse types).


*/