import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private tokenBlacklist: { [token: string]: string } = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async login({ username, password }: AuthLoginDto) {
    const hasUser = await this.userRepository.findOne({ where: { username } })
    if (!hasUser)
      throw new UnauthorizedException('Invalid username')
    const isPasswordValid = await bcrypt.compare(password, hasUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { username };
    const token = this.jwtService.sign(payload);

    return { access_token: token, user: hasUser };
  }


  async logout(user: User, token: string) {
    console.log('user', user);
    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }
    const splitToken = token.split('Bearer ')[1];
    if (!splitToken) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.jwtService.decode(splitToken) as { username?: string };


      if (!payload || !payload.username) {
        throw new Error('Invalid token payload');
      }
      if (payload.username === user.username) {
        if (!this.tokenBlacklist[splitToken]) {
          this.tokenBlacklist[splitToken] = user.username;
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new UnauthorizedException();
    }
  }

}

