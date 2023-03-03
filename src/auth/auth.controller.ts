//auth.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Request } from 'express';
import { User } from 'src/typeorm';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('login')
  create(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('logout')
  async logout(@Req() request: Request) {
    const token = request.headers.authorization?.replace('Bearer ', '');
    const user = request.user as User;
    if (token) {
      await this.authService.logout(user, token);
    } else {
      throw new UnauthorizedException('Invalid token');
    }
    return { message: 'Logged out successfully' };
  }
  
}
