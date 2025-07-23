import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Warehouse } from "./Warehouse";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Warehouse, warehouse => warehouse.company)
  warehouses: Warehouse[];
}
