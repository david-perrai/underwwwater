import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DivesService } from './dives.service';
import { CreateDiveDto } from './dto/create-dive.dto';
import { UpdateDiveDto } from './dto/update-dive.dto';
import { FindAllDivesDto } from './dto/find-all-dives.dto';
import { Dive } from './entities/dive.entity';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import type { IAuthenticatedUser } from '@/auth/types/authenticated-user';

import { Role } from '@/auth/enums/role.enum';
import { Roles } from '@/auth/decorators/roles.decorator';
import { DiveCountDto } from './dto/dive-count.dto';

@ApiTags('dives')
@ApiBearerAuth()
@Controller('dives')
export class DivesController {
  constructor(private readonly divesService: DivesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dive' })
  @ApiResponse({
    status: 201,
    description: 'The dive has been successfully created.',
    type: Dive,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Body() createDiveDto: CreateDiveDto,
  ) {
    return this.divesService.create(createDiveDto, +user.id);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all dives' })
  @ApiResponse({
    status: 200,
    description: 'Return all dives.',
    type: DiveCountDto,
  })
  findAll(@Query() query: FindAllDivesDto) {
    return this.divesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dive by ID' })
  @ApiParam({ name: 'id', description: 'Dive ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the dive.',
    type: Dive,
  })
  @ApiResponse({ status: 404, description: 'Dive not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dive' })
  @ApiParam({ name: 'id', description: 'Dive ID' })
  @ApiResponse({
    status: 200,
    description: 'The dive has been successfully updated.',
    type: Dive,
  })
  @ApiResponse({ status: 404, description: 'Dive not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiveDto: UpdateDiveDto,
    @AuthenticatedUser() user: IAuthenticatedUser,
  ) {
    return this.divesService.update(id, updateDiveDto, +user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dive' })
  @ApiParam({ name: 'id', description: 'Dive ID' })
  @ApiResponse({
    status: 200,
    description: 'The dive has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Dive not found.' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthenticatedUser() user: IAuthenticatedUser,
  ) {
    return this.divesService.remove(id, +user.id);
  }
}
