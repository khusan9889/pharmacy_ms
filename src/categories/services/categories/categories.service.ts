// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Category } from 'src/typeorm';
// import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Category } from 'src/typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }


    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id:number):Promise<Category> {
        const options: FindOneOptions<Category> = { where: { id } }
        return this.categoryRepository.findOne(options)
    }

    async create(category: Category): Promise<Category> {
        await this.categoryRepository.save(category);
        return category;
    }


}