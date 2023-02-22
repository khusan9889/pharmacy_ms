import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { Category } from 'src/typeorm';


@Controller('category')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService){}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category> {
        return this.categoryService.findOne(id)
    }

    @Post()
    async create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() category:Category): Promise<Category> {
        return this.categoryService.update(id, category)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.categoryService.delete(id);
    }

}
