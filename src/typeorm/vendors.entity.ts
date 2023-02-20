import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products.entity';
import { User } from './users.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  product: any;

  @OneToMany(() => Product, product => product.vendor)
  products: Product[];
  purchases: any;


  @OneToMany(() => User, user => user.vendor)
  users: User[];


}
