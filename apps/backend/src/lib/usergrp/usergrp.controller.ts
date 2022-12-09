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
import { UsergrpService } from './usergrp.service';
import { Usergrp } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('usergrp')
@Unprotected()
export class UsergrpController {
  constructor(private readonly usergrpService: UsergrpService) {}

  @Get()
  async getAllUsergrp(): Promise<Usergrp[]> {
    return this.usergrpService.getUsergrp();
  }

  @Post()
  async createUsergrp(@Body() postData: Usergrp): Promise<Usergrp> {
    return this.usergrpService.createUsergrp(postData);
  }

  @Get(':id')
  async getUsergrpBy(@Param('id') id: number): Promise<Usergrp | null> {
    return this.usergrpService.getUsergrpBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<Usergrp> {
    return this.usergrpService.updateUsergrp(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Usergrp> {
    return this.usergrpService.deleteUsergrp(id);
  }
}
