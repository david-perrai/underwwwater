import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Dive } from '@dives/entities/dive.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The user unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The user email address',
  })
  @Column({ unique: true, length: 180 })
  email: string;

  @ApiProperty({
    example: 'johndoe',
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
}
