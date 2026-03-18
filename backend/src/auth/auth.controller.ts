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
import {
  type IAuthenticatedUser,
  IAuthResponse,
} from './types/authenticated-user';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description:
      'Successfully logged in, returns access token and sets refresh token cookie',
    type: IAuthResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 jours en secondes
    });

    // Stocker l'access token dans un cookie lisible par le SSR Nuxt
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60, // 15 minutes en secondes
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed tokens',
    type: IAuthResponse,
  })
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
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    // Mettre à jour l'access token cookie
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @ApiOperation({ summary: 'Log out a user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @AuthenticatedUser() user: IAuthenticatedUser,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    await this.authService.logout(user.id);

    response.clearCookie('refreshToken', { path: '/' });
    response.clearCookie('accessToken', { path: '/' });

    return { message: 'Logged out successfully' };
  }

  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'Reset email sent (if user exists)',
  })
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto.email);
    return {
      message:
        'If an account exists for this email, a reset link has been sent.',
    };
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
    return { message: 'Your password has been reset successfully.' };
  }
}
