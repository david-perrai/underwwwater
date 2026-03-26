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
import { DivingEnvironnementsService } from './diving-environnements.service';
import { CreateDivingEnvironnementDto } from './dto/create-diving-environnement.dto';
import { UpdateDivingEnvironnementDto } from './dto/update-diving-environnement.dto';
import { DivingEnvironment } from './entities/diving-environment.entity';
import { Role } from '@/auth/enums/role.enum';
import { Roles } from '@/auth/decorators/roles.decorator';

@ApiTags('diving-environnements')
@ApiBearerAuth()
@Controller('diving-environnements')
export class DivingEnvironnementsController {
  constructor(
    private readonly divingEnvironnementsService: DivingEnvironnementsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new diving environment' })
  @ApiResponse({
    status: 201,
    description: 'The diving environment has been successfully created.',
    type: DivingEnvironment,
  })
  create(@Body() createDivingEnvironnementDto: CreateDivingEnvironnementDto) {
    return this.divingEnvironnementsService.create(
      createDivingEnvironnementDto,
    );
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all diving environments' })
  @ApiResponse({
    status: 200,
    description: 'Return all diving environments.',
    type: [DivingEnvironment],
  })
  findAll() {
    return this.divingEnvironnementsService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get a diving environment by ID' })
  @ApiParam({ name: 'id', description: 'Diving environment ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the diving environment.',
    type: DivingEnvironment,
  })
  @ApiResponse({ status: 404, description: 'Diving environment not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divingEnvironnementsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a diving environment' })
  @ApiParam({ name: 'id', description: 'Diving environment ID' })
  @ApiResponse({
    status: 200,
    description: 'The diving environment has been successfully updated.',
    type: DivingEnvironment,
  })
  @ApiResponse({ status: 404, description: 'Diving environment not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDivingEnvironnementDto: UpdateDivingEnvironnementDto,
  ) {
    return this.divingEnvironnementsService.update(
      id,
      updateDivingEnvironnementDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a diving environment' })
  @ApiParam({ name: 'id', description: 'Diving environment ID' })
  @ApiResponse({
    status: 200,
    description: 'The diving environment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Diving environment not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.divingEnvironnementsService.remove(id);
  }
}
