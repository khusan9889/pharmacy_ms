//auth.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('login')
  create(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

@Post('logout')
async logout(@Req() request: Request) {
  const token = request['access_token'];
  if (token) {
    await this.authService.logout(token);
  }
  return { message: 'Logged out successfully' };
}
  
}

