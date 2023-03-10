import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';
import { ResultDto } from 'dto/result.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAll(): Promise<ResultDto<Product[]>> {
    const products = await this.productsService.findAll();
    return new ResultDto(true, 'Successfully retrieved products', products);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResultDto<Product>> {
    const product = await this.productsService.findOne(id);
    return new ResultDto(true, 'Successfully retrieved product', product);
  }

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    const product = await this.productsService.addProduct(createProductDto);
    return new ResultDto(true, 'Successfully added product', product);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() product: Product): Promise<ResultDto<Product>> {
    const updatedProduct = await this.productsService.update(id, product);
    return new ResultDto(true, 'Successfully updated product', updatedProduct);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResultDto<void>> {
    await this.productsService.delete(id);
    return new ResultDto(true, 'Successfully deleted product');
  }
}