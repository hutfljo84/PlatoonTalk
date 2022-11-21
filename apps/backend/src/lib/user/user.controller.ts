// libs/products/src/lib/products.controller.ts

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public getUser() {
    return this.userService.getUser();
  }
}
