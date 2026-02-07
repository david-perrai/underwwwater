import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendPasswordResetEmail(email: string, token: string) {
    const appUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000',
    );
    const url = `${appUrl}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: './password-reset', // if we had templates, but we'll use html for now
      html: `
        <p>You requested to reset your password.</p>
        <p>Please click the link below to set a new password:</p>
        <p><a href="${url}">${url}</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });
  }
}
