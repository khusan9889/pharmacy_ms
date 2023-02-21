import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Vendor } from './vendors.entity';
import { Role } from './roles.entity';
import { Matches, IsEmail, IsString, MinLength } from 'class-validator';


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z]*$/;
const PASSWORD_REGEX = /^[^\s]+$/;


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.users)
  vendor: Vendor;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column()
  @IsString()
  @MinLength(3)
  @Matches(USERNAME_REGEX, { message: 'Username should start with an English letter and contain only English letters. Spaces are not allowed' })
  username: string;

  @Column()
  @IsString()
  @Matches(PASSWORD_REGEX, { message: 'Password cannot contain spaces' })
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
  @IsEmail()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

}