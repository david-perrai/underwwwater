import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Dive } from './dive.entity';

@Entity('diving_environments')
export class DivingEnvironment {
  @ApiProperty({
    example: 1,
    description: 'The diving environment unique identifier',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Ocean',
    description: 'Label of the diving environment',
  })
  @Column({ unique: true, length: 255 })
  label: string;

  @ApiProperty({
    example: 'ocean',
    description: 'Token/slug of the diving environment',
  })
  @Column({ unique: true, length: 255 })
  token: string;

  @OneToMany(() => Dive, (dive) => dive.divingEnvironment)
  dives!: Dive[];
}
