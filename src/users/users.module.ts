import { Module } from '@nestjs/common';
// import { UsersController } from './controllers/users/users.controller';
// import { UsersService } from './services/users/users.service';
import { UserController } from './controllers/users/users.controller';
import { UserService } from './services/users/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}



