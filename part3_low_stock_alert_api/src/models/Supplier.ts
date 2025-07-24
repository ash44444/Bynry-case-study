import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  contact_email: string;

  // ---- Products Relation (Many-to-Many)
  @ManyToMany(() => Product, product => product.suppliers)
  @JoinTable()   // owner side पर join table create होगा
  products: Product[];
}
