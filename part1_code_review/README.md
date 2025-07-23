"""
Problems in wong Code
 1. No Validation on Input Data
Issue: No check if keys like 'name', 'sku', 'price', etc. actually exist.
Impact: App will crash with KeyError if a field is missing from request.

2. No SKU Uniqueness Check
Issue: sku should be unique but it isn't checked
Impact: Duplicate SKUs will cause errors or violate database constraints.

 3. Product-Warehouse Relationship Problem
 Issue: warehouse_id is stored inside Product, but product can be in multiple warehouses.
Impact: This breaks the business rule. Product → Warehouse should be many-to-many.

4. Warehouse Existence Not Checked
Issue: warehouse_id used directly without checking if it exists.
Impact: Inventory linked to a non-existing warehouse (foreign key error).

5. No Transaction Rollback on Error
Issue: If the second db.session.commit() (for inventory) fails, product remains but inventory doesn’t.
Impact: Database becomes inconsistent (half entry)

 6. No Type Validation
 Issue: price and initial_quantity may be invalid types (string instead of float/int).
Impact: Type errors or wrong data in DB.

 7. No Error Handling
 Issue: No try except   block.
Impact: If anything fails, app crashes without explanation.

8. Some Optional Fields Not Handled
Issue: Optional fields (e.g., description, tags) are not handled or given defaults.
Impact:Missing optional field handling can cause API crashes (KeyError), store incorrect NULL values, and lead to inconsistent or incomplete data for consumers and analytics.

 """


 

        """
Additional Context
Products can exist in multiple warehouses
Problem in original code:
warehouse_id was saved directly inside Product → this implies one product belongs to only one warehouse.
Fix in corrected code:
 Removed warehouse_id from Product.
 Instead, inventory mapping is handled via Inventory table:
This allows adding the same product to other warehouses later by simply adding new Inventory rows

SKUs must be unique across the platform
Problem in original code:
No uniqueness check → duplicate SKUs possible.
Fix in corrected code:
Added SKU uniqueness check
This ensures no duplicate SKUs get inserted.

Price can be decimal values
Problem in original code:
No type validation → price could be string or invalid type.
Fix in corrected code:
Price explicitly converted to float


Some fields might be optional
Problem in original code
Optional fields like description, tags were assumed mandatory → causing KeyError.
Fix in corrected code:
Optional fields handled with defaults
Handled optional fields safely with defaults

Transaction Safety & Error Handling
Problem in original code:
Separate commits → risk of half data saving.
No rollback on error → possible inconsistent database state.
Fix in corrected code:
Single transaction + rollback

General Validation
Required fields check: prevents KeyError.
Type conversion: ensures numeric values are correct.

"""