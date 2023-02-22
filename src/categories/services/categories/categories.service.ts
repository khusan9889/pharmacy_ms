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

    async update(id:number, category: Category): Promise<Category> {
        const options: FindOneOptions<Category> = { where: { id } }
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne(options)
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }


}