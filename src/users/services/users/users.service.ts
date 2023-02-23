import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from 'src/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } }
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    const existingUserByEmail = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUserByEmail) {
      throw new BadRequestException('This email is already in use. Please try with another email');
    }

    const existingUserByUsername = await this.userRepository.findOne({ where: { username: user.username } });
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists');
    }

    if (!user.username || !user.email || !user.first_name || !user.last_name || !user.phone_number || !user.password) {
      throw new BadRequestException('All fields are required');
    }
    user.password = await bcrypt.hash(user.password, 10);
    await this.userRepository.save(user);
    return user;
  }

  async update(id: number, user: User): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } }
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(options);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
  
}