// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, FindOneOptions } from 'typeorm';
// import { User } from 'src/typeorm';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}





// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
//import { User } from './user.entity';
import { User } from 'src/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: {id} }
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    const options: FindOneOptions<User> = { where: {id} }
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(options);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}