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
import { FileService } from './file.service';
import { File } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('file')
@Unprotected()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getAllFile(): Promise<File[]> {
    return this.fileService.getFile();
  }

  @Post()
  async createFile(@Body() postData: File): Promise<File> {
    return this.fileService.createFile(postData);
  }

  @Get(':id')
  async getFileBy(@Param('id') id: number): Promise<File | null> {
    return this.fileService.getFileBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<File> {
    return this.fileService.updateFile(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<File> {
    return this.fileService.deleteFile(id);
  }
}
