//auth.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Request } from 'express';
import { User } from 'src/typeorm';
import { JwtAuthGuard } from 'src/products_purchase/services/products_purchase/JwtAuthGuard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)

  async logout(@Req() req: Request) {
    console.log('req:', req);

    const { user, headers } = req
    const currentUser = user as User
    return this.authService.logout(currentUser, headers.authorization)

  }
}

