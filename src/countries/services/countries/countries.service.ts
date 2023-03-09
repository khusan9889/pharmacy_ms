import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) { }

    async findAll(): Promise<Country[]> {
        return this.countryRepository.find();
    }
}
