import { Controller, Get, Param, Post, Body, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';
import { ResultDto } from 'dto/result.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAll(@Query('expired') expired?: string): Promise<ResultDto<Product[]>> {
    let expiredDate;
    if (expired) {
        expiredDate = new Date(expired);
        if (isNaN(expiredDate.getTime())) {
            throw new BadRequestException('Invalid date format. Please provide date in yyyy-MM-dd format.');
        }
    }
    const products = await this.productsService.findAll(expiredDate);
    return new ResultDto(true, 'Successfully retrieved products', products);
  }

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    const product = await this.productsService.addProduct(createProductDto);
    return new ResultDto(true, 'Successfully added product', product);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResultDto<Product>> {
    const product = await this.productsService.findOne(id);
    return new ResultDto(true, 'Successfully retrieved product', product);
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

  @Delete('expired/:expirationDate?')
  async removeExpiredProducts(
    @Param('expirationDate') expirationDate?: string
  ): Promise<ResultDto<void>> {
    const date = expirationDate ? new Date(expirationDate) : new Date();
    await this.productsService.removeExpiredProducts(date);
    return new ResultDto(true, 'Successfully removed expired products');
  }

}

