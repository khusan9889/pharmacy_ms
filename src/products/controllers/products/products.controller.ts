import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Post()
    async addProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.addProduct(createProductDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.productsService.delete(id);
    }

}
