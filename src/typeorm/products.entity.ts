import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from './vendors.entity';
import { Category } from './categories.entity';
import { Country } from './countries.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.products)
  vendor: Vendor;

  @Column()
  name: string;

  @Column('text')
  short_description: string;

  @Column()
  barcode: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ type: 'date' })
  manufactured_date: Date;

  @Column({ type: 'date' })
  expired_date: Date;

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
    productPurchase: any;
}
