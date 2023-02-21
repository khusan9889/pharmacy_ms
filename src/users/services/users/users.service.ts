import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from 'src/typeorm';

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

  // async create(user: User): Promise<User> {
  //   return this.userRepository.save(user);
  // }

  async create(user: User): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new BadRequestException('This email is already in use. Please try with another email');
      // return existingUser;
    }

    // try {
    await this.userRepository.save(user);
    return user;
    // } catch (error) {
    //   throw new InternalServerErrorException('Failed to create user');
    // }
  }

  async update(id: number, user: User): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } }
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(options);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}