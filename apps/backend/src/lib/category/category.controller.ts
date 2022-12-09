// libs/products/src/lib/posts.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('category')
@Unprotected()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getCategory();
  }

  @Post()
  async createCategory(@Body() postData: Category): Promise<Category> {
    return this.categoryService.createCategory(postData);
  }

  @Get(':id')
  async getCategoryBy(@Param('id') id: number): Promise<Category | null> {
    return this.categoryService.getCategoryBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<Category> {
    return this.categoryService.updateCategory(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
