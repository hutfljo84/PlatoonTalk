// libs/products/src/lib/products.service.ts

import { Injectable } from '@nestjs/common';
import { Posts, Prisma } from '@prisma/client';
import { throws } from 'assert';
import { PrismaService } from '../../app/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Posts[]> {
    return this.prisma.posts.findMany();
  }

  async getPostsBy(id: number): Promise<Posts | null> {
    return this.prisma.posts.findUnique({ where: { id: Number(id) } });
  }

  async createPosts(data: Posts): Promise<Posts> {
    let id: number | undefined = undefined;

    await this.prisma.posts.findMany().then( (posts) => {
      let index = 0
      while (id === undefined) {
        if (!posts.find(item => item.id === index)) {
          id = index;
        }
        index += 1;
      }
      data.id = id;
    })
    return this.prisma.posts.create({
      data,
    });
  }

  async updatePosts(data: Posts): Promise<Posts> {
    return this.prisma.posts.update({
      where: { id: Number(data.id) },
      data: data,
    });
  }

  async deletePosts(id: number): Promise<Posts> {
    return this.prisma.posts.delete({
      where: { id: Number(id) },
    });
  }
}
