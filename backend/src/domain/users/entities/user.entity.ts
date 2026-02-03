import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Dive } from '@domain/dives/entities/dive.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The user unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'example@email.com',
    description: 'The user email address',
  })
  @Column({ unique: true, length: 180 })
  email: string;

  @ApiProperty({
    example: 'john doe',
    description: 'The user username',
  })
  @Column({ unique: true, length: 255 })
  username: string;

  @ApiProperty({
    example: ['ROLE_USER'],
    description: 'The user roles',
    type: [String],
  })
  @Column({ type: 'simple-array', default: 'ROLE_USER' })
  roles: string[];

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The user avatar URL',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar: string | null;

  @ApiProperty({ description: 'The date the user subscribed' })
  @CreateDateColumn()
  subscribedAt: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'The date the user account was activated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  activatedAt: Date;

  @OneToMany(() => Dive, (dive: Dive) => dive.owner)
  dives!: Dive[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordAndRefreshToken() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.refreshToken && !this.refreshToken.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
    }
  }
}
