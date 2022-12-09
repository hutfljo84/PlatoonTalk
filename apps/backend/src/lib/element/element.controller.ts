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
import { ElementService } from './element.service';
import { Element } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('element')
@Unprotected()
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get()
  async getAllElement(): Promise<Element[]> {
    return this.elementService.getElement();
  }

  @Post()
  async createElement(@Body() postData: Element): Promise<Element> {
    return this.elementService.createElement(postData);
  }

  @Get(':id')
  async getElementBy(@Param('id') id: number): Promise<Element | null> {
    return this.elementService.getElementBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<Element> {
    return this.elementService.updateElement(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Element> {
    return this.elementService.deleteElement(id);
  }
}
