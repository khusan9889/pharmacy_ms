import { Module } from '@nestjs/common';
import { CountriesController } from './controllers/countries/countries.controller';
import { CountriesService } from './services/countries/countries.service';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService]
})
export class CountriesModule {}
