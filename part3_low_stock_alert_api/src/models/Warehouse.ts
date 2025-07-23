import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Company } from "./Company";
import { Inventory } from "./Inventory";
import { Sales } from "./Sales";

@Entity("warehouses")
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @ManyToOne(() => Company, company => company.warehouses)
  company: Company;

  @OneToMany(() => Inventory, inventory => inventory.warehouse)
  inventory: Inventory[];

  @OneToMany(() => Sales, sale => sale.warehouse)
  sales: Sales[];
}
