import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Warehouse } from "./Warehouse";

@Entity("sales")
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.sales)
  product: Product;

  @ManyToOne(() => Warehouse, warehouse => warehouse.sales)
  warehouse: Warehouse;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sale_date: Date;
}
