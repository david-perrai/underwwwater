import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { writeFile, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from '@/configuration/events';
import { ConfirmAccountEvent } from '@/auth/events/confirm-account.event';
import { Cron, CronExpression } from '@nestjs/schedule';

const AVATARS_DIR = join(process.cwd(), 'uploads', 'avatars');

const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    const alreadyExist = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (alreadyExist) {
      throw new BadRequestException('A user already exists with this email');
    }

    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const confirmationExpires = new Date();
    confirmationExpires.setHours(confirmationExpires.getHours() + 24);

    user.confirmationToken = confirmationToken;
    user.confirmationExpires = confirmationExpires;
    user.activatedAt = null;

    const savedUser = await this.usersRepository.save(user);

    this.eventEmitter.emit(
      Events.AUTH_CONFIRM_ACCOUNT,
      new ConfirmAccountEvent(savedUser.email, confirmationToken),
    );

    return savedUser;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteUnconfirmedAccounts() {
    const now = new Date();
    const qb = this.usersRepository.createQueryBuilder('user');
    await qb
      .delete()
      .where('activatedAt IS NULL')
      .andWhere('confirmationExpires < :now', { now })
      .execute();
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findOneBy(criteria: FindOptionsWhere<User>) {
    return this.usersRepository.findOneBy(criteria);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async uploadAvatar(
    userId: number,
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ext = ALLOWED_MIME_TYPES[mimeType];
    if (!ext) {
      throw new Error(`Unsupported MIME type: ${mimeType}`);
    }

    // Crée le dossier si nécessaire
    if (!existsSync(AVATARS_DIR)) {
      mkdirSync(AVATARS_DIR, { recursive: true });
    }

    // Supprime l'ancien avatar s'il existe et est local
    if (user.avatar) {
      const oldFilename = user.avatar.split('/').pop();
      if (oldFilename) {
        const oldPath = join(AVATARS_DIR, oldFilename);
        if (existsSync(oldPath)) {
          await unlink(oldPath).catch(() => null);
        }
      }
    }

    // Sauvegarde le nouveau fichier avec un UUID
    const filename = `${uuidv4()}${ext}`;
    const filePath = join(AVATARS_DIR, filename);
    await writeFile(filePath, fileBuffer);

    // Met à jour l'utilisateur
    user.avatar = `/uploads/avatars/${filename}`;
    return this.usersRepository.save(user);
  }
}
