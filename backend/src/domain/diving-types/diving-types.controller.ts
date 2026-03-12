import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DivingTypesService } from './diving-types.service';
import { CreateDivingTypeDto } from './dto/create-diving-type.dto';
import { UpdateDivingTypeDto } from './dto/update-diving-type.dto';
import { DivingType } from './entities/diving-type.entity';
import { Role } from '@/auth/enums/role.enum';
import { Roles } from '@/auth/decorators/roles.decorator';

@ApiTags('diving-types')
@ApiBearerAuth()
@Controller('diving-types')
export class DivingTypesController {
  constructor(private readonly divingTypesService: DivingTypesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new diving type' })
  @ApiResponse({
    status: 201,
    description: 'The diving type has been successfully created.',
    type: DivingType,
  })
  create(@Body() createDivingTypeDto: CreateDivingTypeDto) {
    return this.divingTypesService.create(createDivingTypeDto);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all diving types' })
  @ApiResponse({
    status: 200,
    description: 'Return all diving types.',
    type: [DivingType],
  })
  findAll() {
    return this.divingTypesService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get a diving type by ID' })
  @ApiParam({ name: 'id', description: 'Diving type ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the diving type.',
    type: DivingType,
  })
  @ApiResponse({ status: 404, description: 'Diving type not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divingTypesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a diving type' })
  @ApiParam({ name: 'id', description: 'Diving type ID' })
  @ApiResponse({
    status: 200,
    description: 'The diving type has been successfully updated.',
    type: DivingType,
  })
  @ApiResponse({ status: 404, description: 'Diving type not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDivingTypeDto: UpdateDivingTypeDto,
  ) {
    return this.divingTypesService.update(id, updateDivingTypeDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a diving type' })
  @ApiParam({ name: 'id', description: 'Diving type ID' })
  @ApiResponse({
    status: 200,
    description: 'The diving type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Diving type not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.divingTypesService.remove(id);
  }
}
