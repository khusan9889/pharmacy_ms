import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Vendor } from './vendors.entity';
import { Category } from './categories.entity';
import { Country } from './countries.entity';
import { ProductPurchase } from './products_purchase.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.products)
  vendor: Vendor;

  @Column({ nullable: false })
  name: string;

  @Column('text')
  short_description: string;

  @Column({ default: '' })
  type: string;

  @Column()
  barcode: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ type: 'date' })
  manufactured_date: Date;

  @Column({ type: 'date' })
  expired_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  removed_at: Date = null;

  @Column('date')
  received_date: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Country, country => country.products)
  country: Country;

  @Column()
  manufacturer: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trade_price: number;

  @OneToMany(() => ProductPurchase, productPurchase => productPurchase.product)
  productPurchases: ProductPurchase[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}