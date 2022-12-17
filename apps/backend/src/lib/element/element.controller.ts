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
import { Roles } from 'nest-keycloak-connect';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get()
  @Roles({ roles: ['app-user', 'app-admin'] })
  async getAllElement(): Promise<Element[]> {
    return this.elementService.getElement();
  }

  @Post()
  @Roles({ roles: ['app-admin'] })
  async createElement(@Body() postData: Element): Promise<Element> {
    return this.elementService.createElement(postData);
  }

  @Get(':id')
  @Roles({ roles: ['app-user', 'app-admin'] })
  async getElementBy(@Param('id') id: number): Promise<Element | null> {
    return this.elementService.getElementBy(id);
  }

  @Put(':id')
  @Roles({ roles: ['app-admin'] })
  async Update(@Param('id') id: number): Promise<Element> {
    return this.elementService.updateElement(id);
  }
  @Delete(':id')
  @Roles({ roles: ['app-admin'] })
  async Delete(@Param('id') id: number): Promise<Element> {
    return this.elementService.deleteElement(id);
  }
}
