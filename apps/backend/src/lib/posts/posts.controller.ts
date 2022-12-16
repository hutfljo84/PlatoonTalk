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
import { PostsService } from './posts.service';
import { Posts } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('posts')
@Unprotected()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @Post()
  async createPosts(@Body() postData: Posts): Promise<Posts> {
    return this.postsService.createPosts(postData);
  }

  @Get(':id')
  async getPostsBy(@Param('id') id: number): Promise<Posts | null> {
    return this.postsService.getPostsBy(id);
  }

  @Put()
  async Update(@Body() postData: Posts): Promise<Posts> {
    return this.postsService.updatePosts(postData);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Posts> {
    return this.postsService.deletePosts(id);
  }
}
