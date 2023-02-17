import { Module } from '@nestjs/common';
import { CountriesController } from './controllers/countries/countries.controller';
import { CountriesService } from './services/countries/countries.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService]
})
export class CountriesModule {}
