import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from '@/auth/decorators/public.decorator';
import { DivesService } from '@/domain/dives/dives.service';
import { FindAllDivesBaseDto } from '@/domain/dives/dto/find-all-dives.dto';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import type { IAuthenticatedUser } from '@/auth/types/authenticated-user';

import { Role } from '@/auth/enums/role.enum';
import { Roles } from '@/auth/decorators/roles.decorator';
import { DiveCountDto } from '../dives/dto/dive-count.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly divesService: DivesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Return current user.', type: User })
  findMe(@AuthenticatedUser() user: IAuthenticatedUser) {
    return this.usersService.findOne(+user.id);
  }

  @Get('/me/dives')
  @ApiOperation({ summary: 'Get all dives for connected user' })
  @ApiResponse({
    status: 200,
    description: 'Return the user dives.',
    type: [DiveCountDto],
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findDives(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Query() query: FindAllDivesBaseDto,
  ) {
    return this.divesService.findAll({ ...query, userId: String(user.id) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (user.id !== +id) {
      throw new ForbiddenException('You can update only your profile.');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  remove(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Param('id') id: number,
  ) {
    if (user.id !== +id) {
      throw new ForbiddenException('You can delete only your profile.');
    }
    return this.usersService.remove(id);
  }
}
