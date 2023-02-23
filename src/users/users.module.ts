import { Module } from '@nestjs/common';
import { UserController } from './controllers/users/users.controller';
import { UserService } from './services/users/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';

import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'YOUR_SECRET_KEY',
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}



