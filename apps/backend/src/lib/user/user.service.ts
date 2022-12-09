// libs/products/src/lib/products.service.ts

import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../app/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserBy(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async createUser(data: User): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: {
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
