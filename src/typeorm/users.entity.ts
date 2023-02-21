import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Vendor } from './vendors.entity';
import { Role } from './roles.entity';
import { Matches, IsEmail, IsString, MinLength } from 'class-validator';


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/;
const PASSWORD_REGEX = /^[^\s]+$/;

@Entity()
export class User {
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.users)
  vendor: Vendor;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column({ unique: true })
  @IsString()
  @MinLength(3)
  @Matches(USERNAME_REGEX, { message: 'Username should start with an English letter and contain only English letters. Spaces are not allowed' })
  username: string;

  @Column({ nullable: false })
  @IsString()
  @Matches(PASSWORD_REGEX, { message: 'Password cannot contain spaces' })
  password: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column( { nullable:true } )
  patronomyc: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

}