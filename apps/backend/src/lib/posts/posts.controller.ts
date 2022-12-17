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
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiTags } from '@nestjs/swagger';
import { createPostDto } from '../dto/createPostsDto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Unprotected()
  async getAllPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @Post()
  @Unprotected()
  async createPosts(@Body() createPostDto: createPostDto): Promise<Posts> {
    return this.postsService.createPosts(createPostDto);
  }

  @Get(':id')
  @Unprotected()
  async getPostsBy(@Param('id') id: number): Promise<Posts | null> {
    return this.postsService.getPostsBy(id);
  }

  @Put()
  @Roles({ roles: ['app-admin'] })
  async Update(@Body() postData: Posts): Promise<Posts> {
    return this.postsService.updatePosts(postData);
  }

  @Delete(':id')
  @Roles({ roles: ['app-user'] })
  async Delete(@Param('id') id: number): Promise<Posts> {
    return this.postsService.deletePosts(id);
  }
}
