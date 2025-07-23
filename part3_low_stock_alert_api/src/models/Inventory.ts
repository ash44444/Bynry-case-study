import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Warehouse } from "./Warehouse";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.inventory)
  product: Product;

  @ManyToOne(() => Warehouse, warehouse => warehouse.inventory)
  warehouse: Warehouse;

  @Column({ type: "integer", default: 0 })
  quantity: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
