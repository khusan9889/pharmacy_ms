import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Vendor } from './vendors.entity';
import { ProductPurchase } from './products_purchase.entity';
import { PaymentDetails } from './payment_details.entity';
import { User } from './users.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.purchases)
  vendor: Vendor;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @ManyToOne(() => User, user => user.purchases)
  user: User;

  @OneToMany(() => ProductPurchase, (productPurchase) => productPurchase.purchase)
  productPurchase: ProductPurchase[];

  @OneToOne(() => PaymentDetails, paymentDetails => paymentDetails.purchase)
  paymentDetails: PaymentDetails;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
  
}

