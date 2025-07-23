 # Corrected Version code

@app.route('/api/products', methods=['POST'])
def create_product():
    #  Get JSON input
    data = request.get_json()

    # ------------------ FIX 1: Validate Required Fields ------------------
    required_fields = ['name', 'sku', 'price', 'warehouse_id', 'initial_quantity']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return {"error": f"Missing fields: {', '.join(missing)}"}, 400

    # ------------------ FIX 2: Validate Data Types ------------------
    try:
        price = float(data['price'])                # ensure price is float
        initial_quantity = int(data['initial_quantity'])  # ensure quantity is int
    except ValueError:
        return {"error": "Price must be a number and initial_quantity must be an integer"}, 400

    # ------------------ FIX 3: SKU Uniqueness Check ------------------
    if Product.query.filter_by(sku=data['sku']).first():
        return {"error": "SKU already exists"}, 400

    # ------------------ FIX 4: Warehouse Existence Check ------------------
    warehouse = Warehouse.query.get(data['warehouse_id'])
    if not warehouse:
        return {"error": "Warehouse does not exist"}, 404

    # ------------------ FIX 5 & 7: Use try-except with single transaction ------------------
    try:
        # Optional fields handling (FIX 8)
        description = data.get('description', '')   # default empty string
        tags = data.get('tags', [])                 # default empty list

        # ------------------ FIX 3 (Product-Warehouse Relationship) ------------------
        # Remove warehouse_id from Product directly since a product can exist in multiple warehouses.
        product = Product(
            name=data['name'],
            sku=data['sku'],
            price=price,
            description=description,
            tags=tags
        )
        db.session.add(product)
        db.session.flush()  # get product.id without committing

        # Create inventory entry (Product-Warehouse mapping)
        inventory = Inventory(
            product_id=product.id,
            warehouse_id=data['warehouse_id'],
            quantity=initial_quantity
        )
        db.session.add(inventory)

        # Commit everything in one transaction (Fix 5)
        db.session.commit()

        return {"message": "Product created successfully", "product_id": product.id}, 201

    except Exception as e:
        db.session.rollback()  # rollback transaction on error (Fix 5 & 7)
        return {"error": "Internal server error", "details": str(e)}, 500





