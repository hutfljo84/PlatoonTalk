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
import { Roles } from 'nest-keycloak-connect';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
    @Roles({roles: ['app-user', 'app-admin']})
  async getAllPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @Post()
    @Roles({roles: ['app-admin',]})
  async createPosts(@Body() postData: Posts): Promise<Posts> {
    return this.postsService.createPosts(postData);
  }

  @Get(':id')
    @Roles({roles: ['app-user', 'app-admin']})
  async getPostsBy(@Param('id') id: number): Promise<Posts | null> {
    return this.postsService.getPostsBy(id);
  }

  @Put()
    @Roles({roles: ['app-admin']})
  async Update(@Body() postData: Posts): Promise<Posts> {
    return this.postsService.updatePosts(postData);
  }

  @Delete(':id')
    @Roles({roles: ['app-admin']})
  async Delete(@Param('id') id: number): Promise<Posts> {
    return this.postsService.deletePosts(id);
  }
}
