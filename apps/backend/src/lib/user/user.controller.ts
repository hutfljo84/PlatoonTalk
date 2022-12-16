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
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from '../dto/createUserDto';

@Controller('user')
@ApiTags('users')
@Unprotected()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.userService.getUser();
  }

  @Post()
  async createUser(@Body() createUserDto: createUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserBy(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<User> {
    return this.userService.updateUser(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
