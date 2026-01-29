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
  ApiQuery,
} from '@nestjs/swagger';
import { DivesService } from './dives.service';
import { CreateDiveDto } from './dto/create-dive.dto';
import { UpdateDiveDto } from './dto/update-dive.dto';
import { Dive } from './entities/dive.entity';

@ApiTags('dives')
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
  create(@Body() createDiveDto: CreateDiveDto) {
    // TODO: Get user from JWT token/session
    // For now, we'll need to pass a mock user or get it from request
    // return this.divesService.create(createDiveDto, user);
    return { message: 'Create dive endpoint - authentication required' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all dives' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter dives by user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all dives.',
    type: [Dive],
  })
  findAll(@Query('userId') userId?: string) {
    return this.divesService.findAll(userId ? parseInt(userId, 10) : undefined);
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
  ) {
    // TODO: Get user from JWT token/session
    // return this.divesService.update(id, updateDiveDto, user);
    return { message: 'Update dive endpoint - authentication required' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dive' })
  @ApiParam({ name: 'id', description: 'Dive ID' })
  @ApiResponse({
    status: 200,
    description: 'The dive has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Dive not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: Get user from JWT token/session
    // return this.divesService.remove(id, user);
    return { message: 'Delete dive endpoint - authentication required' };
  }
}
