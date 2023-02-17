import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
