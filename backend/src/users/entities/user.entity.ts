import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The user unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'The user email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'John', description: 'The user first name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The user last name' })
  @Column()
  lastName: string;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'The date the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
