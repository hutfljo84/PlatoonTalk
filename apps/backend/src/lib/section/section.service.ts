// libs/products/src/lib/products.service.ts

import { Injectable } from '@nestjs/common';
import { Section, Prisma } from '@prisma/client';
import { PrismaService } from '../../app/prisma.service';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async getSection(): Promise<Section[]> {
    return this.prisma.section.findMany();
  }

  async getSectionBy(id: number): Promise<Section | null> {
    return this.prisma.section.findUnique({ where: { id: Number(id) } });
  }

  async getSectionsByElementId(id: number): Promise<Section[] | null> {
    return this.prisma.section.findMany({where: { elementid: Number(id)}});
  }

  async createSection(data: Section): Promise<Section> {
    return this.prisma.section.create({
      data,
    });
  }

  async updateSection(id: number): Promise<Section> {
    return this.prisma.section.update({
      where: { id: Number(id) },
      data: {},
    });
  }

  async deleteSection(id: number): Promise<Section> {
    return this.prisma.section.delete({
      where: { id: Number(id) },
    });
  }
}
