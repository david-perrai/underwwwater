import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Dive } from './dive.entity';

@Entity('diving_roles')
export class DivingRole {
  @ApiProperty({ example: 1, description: 'The diving role unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Dive Master',
    description: 'Label of the diving role',
  })
  @Column({ unique: true, length: 255 })
  label: string;

  @ApiProperty({
    example: 'dive-master',
    description: 'Token/slug of the diving role',
  })
  @Column({ unique: true, length: 255 })
  token: string;

  @OneToMany(() => Dive, (dive) => dive.divingRole)
  dives!: Dive[];
}
