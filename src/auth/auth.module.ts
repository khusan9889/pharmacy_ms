//auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';


dotenv.config();


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.SECRET_KEY ,
      signOptions: { expiresIn: '1d' },
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }


