import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from './vendors.entity';
import { Role } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.users)
  vendor: Vendor;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  patronomyc: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;
}