//auth.controller.ts
import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Request } from 'express';
import { User } from 'src/typeorm';
import { JwtAuthGuard } from 'src/products_purchase/services/products_purchase/JwtAuthGuard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    const { access_token, user } = await this.authService.login(authLoginDto, res);
    return { access_token, user };
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

