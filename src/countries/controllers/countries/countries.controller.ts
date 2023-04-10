import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResultDto } from 'dto/result.dto';
import { CountriesService } from 'src/countries/services/countries/countries.service';
import { Country } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findall(): Promise<ResultDto<Country[]>> {
        const countries = await this.countriesService.findAll();
        return new ResultDto(true, 'Successfully retrieved countries', countries);
    }
}
