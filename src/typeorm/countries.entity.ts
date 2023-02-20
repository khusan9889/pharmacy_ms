import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products.entity';


@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'integer' })
  country_code: number;

  @OneToMany(() => Product, product => product.vendor)
  products: Product[];
  
}
