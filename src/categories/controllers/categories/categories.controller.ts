import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
}
