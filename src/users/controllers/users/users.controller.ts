// import { Controller, Get, Param } from '@nestjs/common';
// import { UserService } from 'src/users/services/users/users.service';
// import { User } from 'src/typeorm';


// // @Controller('users')
// // export class UserController {
// //   constructor(private readonly userService: UserService) {}

// //   @Get()
// //   async findAll(): Promise<User[]> {
// //     return this.userService.findAll();
// //   }



// //   @Get(':id')
// //   async findOne(@Param('id') id: string): Promise<User> {
// //     return this.userService.findOne(Number(id));
// //   }
// // }

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User } from './user.entity';
import { UserService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}