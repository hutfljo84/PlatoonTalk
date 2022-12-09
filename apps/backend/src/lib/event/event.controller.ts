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
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('event')
@Unprotected()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvent(): Promise<Event[]> {
    return this.eventService.getEvent();
  }

  @Post()
  async createEvent(@Body() postData: Event): Promise<Event> {
    return this.eventService.createEvent(postData);
  }

  @Get(':id')
  async getEventBy(@Param('id') id: number): Promise<Event | null> {
    return this.eventService.getEventBy(id);
  }

  @Put(':id')
  async Update(@Param('id') id: number): Promise<Event> {
    return this.eventService.updateEvent(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Event> {
    return this.eventService.deleteEvent(id);
  }
}
