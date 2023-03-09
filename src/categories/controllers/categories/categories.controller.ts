import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { Category } from 'src/typeorm';
import { ResultDto } from 'dto/result.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll(): Promise<ResultDto<Category[]>> {
    const categories = await this.categoryService.findAll();
    return new ResultDto<Category[]>(true, 'Successfully retrieved categories', categories);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResultDto<Category>> {
    const category = await this.categoryService.findOne(id);
    return new ResultDto<Category>(true, 'Successfully retrieved category', category);
  }

  @Post()
  async create(@Body() category: Category): Promise<ResultDto<Category>> {
    const createdCategory = await this.categoryService.create(category);
    return new ResultDto<Category>(true, 'Category created successfully', createdCategory);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() category: Category,
  ): Promise<ResultDto<Category>> {
    const updatedCategory = await this.categoryService.update(id, category);
    return new ResultDto<Category>(true, 'Category updated successfully', updatedCategory);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResultDto<null>> {
    await this.categoryService.delete(id);
    return new ResultDto<null>(true, 'Category deleted successfully');
  }
}