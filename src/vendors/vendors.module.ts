import { Module } from '@nestjs/common';
import { VendorsController } from './controllers/vendors/vendors.controller';
import { VendorsService } from './services/vendors/vendors.service';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService]
})
export class VendorsModule {}
