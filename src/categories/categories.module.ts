import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
