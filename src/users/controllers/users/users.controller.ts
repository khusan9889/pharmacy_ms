import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm';
import { ResultDto } from 'dto/result.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async findAll(): Promise<ResultDto<User[]>> {
    const users = await this.userService.findAll();
    return new ResultDto(true, 'Successfully retrieved users. Test', users);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResultDto<User>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return new ResultDto(false, 'User not found', null);
    }
    return new ResultDto(true, 'Successfully retrieved user', user);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() user: User): Promise<ResultDto<User>> {
    const createdUser = await this.userService.create(user);
    return new ResultDto(true, 'User created successfully', createdUser);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<ResultDto<User>> {
    const updatedUser = await this.userService.update(id, user);
    return new ResultDto(true, 'User updated successfully', updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResultDto<null>> {
    await this.userService.delete(id);
    return new ResultDto(true, 'User deleted successfully', null);
  }

}