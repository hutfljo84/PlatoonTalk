// libs/products/src/lib/products.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from '@prisma/client';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('section')
@Unprotected()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  @Unprotected()
  async getAllSection(): Promise<Section[]> {
    return this.sectionService.getSection();
  }

  @Post()
  @Roles({ roles: ['app-admin'] })
  async createSection(@Body() postData: Section): Promise<Section> {
    return this.sectionService.createSection(postData);
  }

  @Get(':id')
  @Unprotected()
  async getSectionBy(@Param('id') id: number): Promise<Section | null> {
    return this.sectionService.getSectionBy(id);
  }

  @Get('element/:id')
  @Unprotected()
  async getSectionsByElementId(
    @Param('id') id: number
  ): Promise<Section[] | null> {
    return this.sectionService.getSectionsByElementId(id);
  }

  @Put(':id')
  @Roles({ roles: ['app-admin'] })
  async Update(@Param('id') id: number): Promise<Section> {
    return this.sectionService.updateSection(id);
  }
  @Delete(':id')
  @Roles({ roles: ['app-admin'] })
  async Delete(@Param('id') id: number): Promise<Section> {
    return this.sectionService.deleteSection(id);
  }
}
