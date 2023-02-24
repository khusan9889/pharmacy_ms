import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';

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

    async addProduct(addProductDto: CreateProductDto): Promise<Product> {

        let product = await this.productRepository.findOne({ where: { barcode: addProductDto.barcode, expired_date: addProductDto.expired_date } });
        if (product) {
            product.amount += addProductDto.amount;
            product.updated = new Date();
            const result = await this.productRepository.update(product.id, product)
            return result[0];
        } else {
            const { name,
                short_description,
                barcode,
                manufactured_date,
                expired_date,
                received_date,
                amount,
                manufacturer,
                price,
                trade_price } = addProductDto
            const result = await this.productRepository.save({
                name,
                short_description,
                barcode,
                manufactured_date,
                expired_date,
                received_date,
                amount,
                manufacturer,
                price,
                trade_price
            })
            return result[0]
        }
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
