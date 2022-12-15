// apps/api/src/app/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryController } from '../lib/category/category.controller';
import { CategoryService } from '../lib/category/category.service';
import { UserService } from '../lib/user/user.service';
import { UserController } from '../lib/user/user.controller';
import { ElementController } from '../lib/element/element.controller';
import { ElementService } from '../lib/element/element.service';
import { UsergrpController } from '../lib/usergrp/usergrp.controller';
import { UsergrpService } from '../lib/usergrp/usergrp.service';
import { FileController } from '../lib/file/file.controller';
import { FileService } from '../lib/file/file.service';
import { SectionController } from '../lib/section/section.controller';
import { SectionService } from '../lib/section/section.service';
import { EventController } from '../lib/event/event.controller';
import { EventService } from '../lib/event/event.service';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:28080/auth',
      realm: 'PlatoonTalk',
      clientId: 'nest-api',
      secret: 'NR2Xy6raVsbsVvsj4c5prHQx1TyX5RiP',
      logLevels: ['error'],
      policyEnforcement: PolicyEnforcementMode.ENFORCING,
      tokenValidation: TokenValidation.OFFLINE,
    }),
  ],
  controllers: [
    CategoryController,
    UserController,
    ElementController,
    UsergrpController,
    FileController,
    SectionController,
    EventController,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Global Authentication Guard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // Global Role Guard
    },
    CategoryService,
    UserService,
    ElementService,
    UsergrpService,
    FileService,
    SectionService,
    EventService,
  ],
})
export class AppModule {}
