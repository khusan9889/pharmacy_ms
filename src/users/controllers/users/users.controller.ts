import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm';

import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'dto/login.dto';
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
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
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    const user = await this.userService.findByUsername(loginDTO.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }



}

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   async login(@Body() loginDto: LoginDTO) {
//     const user = await this.userService.authenticateUser(loginDto.username, loginDto.password);
//     const payload = { sub: user.id, username: user.username };
//     const token = this.jwtService.sign(payload);
//     return { token };
//   }
// }

