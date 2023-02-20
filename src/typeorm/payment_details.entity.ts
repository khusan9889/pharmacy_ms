import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Purchase } from './purchases.entity';

@Entity()
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_method: string;

  @ManyToOne(() => Purchase, purchase => purchase.payment_details)
  purchase: Purchase;
}