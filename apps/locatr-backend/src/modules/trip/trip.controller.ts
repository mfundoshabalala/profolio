import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripService.create(createTripDto);
  }

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip | null> {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto): Promise<UpdateResult> {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.tripService.remove(id);
  }
}
