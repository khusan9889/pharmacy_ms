import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
// import { ParseArrayPipe } from '@nestjs/common/pipes';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return this.productsService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product:Product): Promise<Product> {
        return this.productsService.update(id, product);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.productsService.delete(id);
    }

}
