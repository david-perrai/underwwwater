import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  Body,
  Query,
  Req,
  Ip,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiConsumes,
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
import { CaptchaService } from '@/auth/captcha.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly divesService: DivesService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @Public()
  async create(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    const isHuman = await this.captchaService.verifyTurnstile(
      createUserDto.turnstileToken,
      ip,
    );
    if (isHuman) {
      return this.usersService.create(createUserDto);
    }
    throw new BadRequestException('Invalid captcha');
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

  @Post(':id/avatar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload an avatar for a user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpeg, png, webp, gif) — max 5 Mo',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Avatar uploaded successfully.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Invalid file (type or size).' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async uploadAvatar(
    @AuthenticatedUser() currentUser: IAuthenticatedUser,
    @Param('id') id: number,
    @Req() req: FastifyRequest,
  ) {
    if (currentUser?.id !== +id) {
      throw new ForbiddenException('You can only update your own avatar.');
    }

    const ALLOWED_MIME_TYPES = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    const data = await req.file();

    if (!data) {
      throw new BadRequestException('No file uploaded.');
    }

    if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type: ${data.mimetype}. Allowed: jpeg, png, webp, gif.`,
      );
    }

    const fileBuffer = await data.toBuffer();

    return this.usersService.uploadAvatar(+id, fileBuffer, data.mimetype);
  }
}
