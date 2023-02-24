import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';
import { Purchase } from './purchases.entity';


@Entity()
export class ProductPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.productPurchases)
  product: Product;

  @ManyToOne(() => Purchase, (purchase) => purchase.productPurchase)
  purchase: Purchase;

  @Column()
  amount: number; //number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}

