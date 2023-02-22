import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const options: FindOneOptions<Product> = { where: { id } }
        return this.productRepository.findOne(options);
    }

    async create(product: Product): Promise<Product> {
        await this.productRepository.save(product);
        return product;
    }

    async update(id: number, product: Product): Promise<Product> {
        const options: FindOneOptions<Product> = { where: { id } }
        await this.productRepository.update(id, product);
        return this.productRepository.findOne(options)
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

}
