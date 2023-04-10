import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from 'src/components/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';

@Module({
    imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10' },
      }),
    ],
    providers: [
      AuthService, 
      LocalStrategy, 
      JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
  })
  export class AuthModule {}