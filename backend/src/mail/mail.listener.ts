import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ResetPasswordEvent } from '@/auth/events/reset-password.event';
import { MailService } from './mail.service';
import { Events } from '@/configuration/events';

@Injectable()
export class MailListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(Events.AUTH_RESET_PASSWORD)
  handleResetPasswordEvent(event: ResetPasswordEvent) {
    void this.mailService.sendPasswordResetEmail(event.email, event.token);
  }
}
