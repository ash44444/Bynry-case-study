-- 1. Companies Table
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  -- Justification: Each company may have multiple warehouses and products linked indirectly.
);

-- 2. Warehouses Table
CREATE TABLE warehouses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
  -- Justification: Linked to companies, enabling company-specific warehouse grouping.
);

-- 3. Products Table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_bundle BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  -- Justification: SKU unique across platform ensures no duplicate identification.
  -- is_bundle helps differentiate normal products vs bundle products.
);

-- 4. Product Inventory Table (Many-to-Many)
CREATE TABLE product_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  warehouse_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  threshold INT DEFAULT 0,  -- Added threshold at warehouse level
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (product_id, warehouse_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
  -- Justification: Maintains per-warehouse stock level and low-stock threshold.
);

-- 5. Inventory History Table
CREATE TABLE inventory_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  warehouse_id INT NOT NULL,
  change_type ENUM('ADD', 'REMOVE', 'SALE', 'RETURN', 'ADJUST') NOT NULL,
  quantity_change INT NOT NULL,
  reason TEXT,
  changed_by VARCHAR(100), -- track user who changed inventory
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
  -- Justification: Enables full audit of inventory changes for analytics & rollback.
);

-- 6. Suppliers Table
CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  lead_time_days INT DEFAULT 0, -- added for stock planning
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  -- Justification: supplier lead time helps stockout predictions.
);

-- 7. Product Suppliers Table (Many-to-Many)
CREATE TABLE product_suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  supplier_id INT NOT NULL,
  UNIQUE (product_id, supplier_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
  -- Justification: Many suppliers can provide same product; many-to-many relation.
);

-- 8. Product Bundle Items Table
CREATE TABLE product_bundle_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bundle_product_id INT NOT NULL,
  component_product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  UNIQUE (bundle_product_id, component_product_id),
  CHECK (bundle_product_id != component_product_id),
  FOREIGN KEY (bundle_product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (component_product_id) REFERENCES products(id) ON DELETE CASCADE
  -- Justification: Handles nested product bundles while preventing self-referencing loops.
);
