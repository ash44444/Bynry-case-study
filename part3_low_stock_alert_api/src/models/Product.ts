import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Supplier } from "./Supplier";
import { Inventory } from "./Inventory";
import { Sales } from "./Sales";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  sku: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "integer", default: 20 }) // threshold example
  threshold: number;

  @ManyToOne(() => Supplier, supplier => supplier.products)
  supplier: Supplier;

  @OneToMany(() => Inventory, inventory => inventory.product)
  inventory: Inventory[];

  @OneToMany(() => Sales, sale => sale.product)
  sales: Sales[];
}
