import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Vendor } from './vendors.entity';
import { ProductPurchase } from './products_purchase.entity';
import { PaymentDetails } from './payment_details.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.purchases)
  vendor: Vendor;

  @Column()
  total_price: number;

  @OneToMany(() => ProductPurchase, (productPurchase) => productPurchase.purchase)
  productPurchase: ProductPurchase[];

  @OneToMany(() => PaymentDetails, payment_details => payment_details.purchase)
  payment_details: PaymentDetails[];
  
}