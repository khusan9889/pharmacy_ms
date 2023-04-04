//products.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';
import { Category } from 'src/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

    ) { }

    async findAll(order: 'ASC' | 'DESC' = 'DESC'): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['category'],
            where: {
                removed_at: IsNull(),
            },
            order: {
                id: order,
            },
        });
    }

    async findOne(id: number): Promise<Product> {
        const options: FindOneOptions<Product> = { where: { id }, relations: ['category'] }
        return this.productRepository.findOne(options);
    }

    async addProduct(addProductDto: CreateProductDto, category: { id?: number } = {}): Promise<Product> {

        let product = await this.productRepository.findOne({ where: { barcode: addProductDto.barcode, expired_date: addProductDto.expired_date } });
        if (product) {
            product.amount += addProductDto.amount;
            product.updated = new Date();
            const result = await this.productRepository.update(product.id, product)
            return result[0];
        } else {
            const { name,
                short_description,
                type,
                barcode,
                manufactured_date,
                expired_date,
                received_date,
                amount,
                package_type,
                per_box,
                package_amount,
                manufacturer,
                price,
                trade_price } = addProductDto

            let categoryInstance = null;
            if (category.id) {
                categoryInstance = await this.categoryRepository.findOne({ where: { id: category.id } });
            }

            const result = await this.productRepository.save({
                name,
                short_description,
                type,
                barcode,
                manufactured_date,
                expired_date,
                received_date,
                amount,
                package_type,
                per_box,
                package_amount,
                manufacturer,
                price,
                trade_price,
                category: categoryInstance
            })
            return result;
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

    async purchaseProduct(productId: number, purchaseAmount: number): Promise<void> {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }
    
        // Calculate the total number of packages available for the product
        const packageAmount = Math.floor(product.amount / product.per_box);
    
        if (packageAmount === 0) {
            throw new BadRequestException(`Product with ID ${productId} is out of stock`);
        }
        
        if (purchaseAmount > packageAmount * product.per_box) {
            throw new BadRequestException(`Not enough quantity for product with ID ${productId}`);
        }
        
        product.amount -= purchaseAmount;
        
        // Subtract the package amount if necessary
        if (product.amount % product.per_box === 0) {
            product.package_amount = Math.floor(product.amount / product.per_box);
        }
    
        await this.productRepository.save(product);
    }

    async findAllExpired(expirationDate?: Date): Promise<Product[]> {
        const currentDate = new Date();
        const expiredDate = expirationDate ? expirationDate : currentDate;
        const dateString = expiredDate.toISOString().substring(0, 10);
        const expiredDateTime = new Date(dateString);
        return this.productRepository.find({
            where: {
                expired_date: LessThanOrEqual(expiredDateTime),
                amount: MoreThan(0),
                removed_at: IsNull()
            },
            relations: ['category'],
            order: {
                expired_date: 'ASC'
            }
        });
    }

    async removeExpiredProducts(expirationDate: Date): Promise<void> {
        const expiredProducts = await this.productRepository.find({
            where: { expired_date: LessThanOrEqual(expirationDate) }
        });

        if (expiredProducts.length === 0) {
            return;
        }

        const currentDateTime = new Date();
        await this.productRepository.update(
            { id: In(expiredProducts.map(p => p.id)) },
            { removed_at: currentDateTime }
        );
    }

    async deleteExpiredProductsID(ids: number[]): Promise<void> {
        const products = await this.productRepository.find({
            where: { id: In(ids) },
        });

        if (products.length === 0) {
            return;
        }

        const currentDateTime = new Date();
        await this.productRepository.update(
            { id: In(products.map((p) => p.id)) },
            { removed_at: currentDateTime },
        );
    }

}

