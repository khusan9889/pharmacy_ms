import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Purchase } from './purchases.entity';

@Entity()
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_method: string;

  @OneToOne(() => Purchase, purchase => purchase.paymentDetails)
  @JoinColumn()
  purchase: Purchase;

}