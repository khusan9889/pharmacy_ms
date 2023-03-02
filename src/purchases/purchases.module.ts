//purchase.module.ts
import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases/purchases.controller';
import { PurchasesService } from './services/purchases/purchases.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService]
})
export class PurchasesModule {}

