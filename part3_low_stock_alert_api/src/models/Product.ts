import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Supplier } from "./Supplier";
import { Inventory } from "./Inventory";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "integer", default: 0 })
  threshold: number;

  // ---- Inventory Relation (Many-to-Many with Warehouse via Inventory)
  @OneToMany(() => Inventory, inventory => inventory.product)
  inventory: Inventory[];

  // ---- Suppliers Relation (Many-to-Many)
  @ManyToMany(() => Supplier, supplier => supplier.products)
  suppliers: Supplier[];
}
