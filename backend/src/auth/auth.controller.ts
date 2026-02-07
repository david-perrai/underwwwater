import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { type FastifyReply } from 'fastify';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import type { IAuthenticatedUser } from './types/authenticated-user';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description:
      'Successfully logged in, returns access token and sets refresh token cookie',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  @Public()
  @UseGuards(ThrottlerGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const tokens = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    // Stocker le refresh token dans un cookie httpOnly
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS en production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
  @ApiResponse({ status: 200, description: 'Successfully refreshed tokens' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    if (!user.refreshToken) {
      throw new UnauthorizedException('Refresh token cookie is not defined');
    }

    const tokens = await this.authService.refreshTokens(
      user.id,
      user.refreshToken,
    );

    // Mettre à jour le refresh token cookie
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @ApiOperation({ summary: 'Log out a user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    await this.authService.logout(user.id);

    response.clearCookie('refreshToken');

    return { message: 'Logged out successfully' };
  }
}
