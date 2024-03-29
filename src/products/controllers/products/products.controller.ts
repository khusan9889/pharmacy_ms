import { Controller, Get, Param, Post, Body, Put, Delete, Query, BadRequestException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm';
import { CreateProductDto } from 'dto/create_product.dto';
import { ResultDto } from 'dto/result.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('order') order: 'ASC' | 'DESC' = 'DESC'): Promise<ResultDto<Product[]>> {
    const products = await this.productsService.findAll(order);
    return new ResultDto(true, 'Successfully retrieved products', products);
  }

  @UseGuards(JwtAuthGuard)
  @Get('expired-products')
  async findAllExpired(@Query('expirationDate') expirationDateString?: string): Promise<ResultDto<Product[]>> {
    let expirationDate: Date | undefined;
    if (expirationDateString) {
      expirationDate = new Date(expirationDateString);
      if (isNaN(expirationDate.getTime())) {
        throw new BadRequestException('Invalid date format. Please provide date in yyyy-MM-dd format.');
      }
    }
    const products = await this.productsService.findAllExpired(expirationDate);
    return new ResultDto(true, 'Successfully retrieved expired products', products);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    const product = await this.productsService.addProduct(createProductDto);
    return new ResultDto(true, 'Successfully added product', product);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResultDto<Product>> {
    const product = await this.productsService.findOne(id);
    return new ResultDto(true, 'Successfully retrieved product', product);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() product: Product): Promise<ResultDto<Product>> {
    const updatedProduct = await this.productsService.update(id, product);
    return new ResultDto(true, 'Successfully updated product', updatedProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResultDto<void>> {
    await this.productsService.delete(id);
    return new ResultDto(true, 'Successfully deleted product');
  }

  @UseGuards(JwtAuthGuard)
  @Delete('expired/:expirationDate?')
  async removeExpiredProducts(
    @Param('expirationDate') expirationDate?: string
  ): Promise<ResultDto<void>> {
    const date = expirationDate ? new Date(expirationDate) : new Date();
    await this.productsService.removeExpiredProducts(date);
    return new ResultDto(true, 'Successfully removed expired products');
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-expired/:ids')
  async deleteExpiredProducts(@Param('ids') ids: string): Promise<ResultDto<void>> {
    const idList = ids.split(',').map((id) => parseInt(id.trim()));
    await this.productsService.deleteExpiredProductsID(idList);
    return new ResultDto(true, 'Successfully deleted expired products');
  }
}

