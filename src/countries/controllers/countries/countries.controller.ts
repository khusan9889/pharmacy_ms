import { Controller, Get } from '@nestjs/common';
import { ResultDto } from 'dto/result.dto';
import { CountriesService } from 'src/countries/services/countries/countries.service';
import { Country } from 'src/typeorm';

@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }

    @Get()
    async findall(): Promise<ResultDto<Country[]>> {
        const countries = await this.countriesService.findAll();
        return new ResultDto(true, 'Successfully retrieved countries', countries);
    }
}
