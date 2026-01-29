import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Dive } from './dive.entity';

@Entity('diving_types')
export class DivingType {
  @ApiProperty({ example: 1, description: 'The diving type unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Recreational',
    description: 'Label of the diving type',
  })
  @Column({ unique: true, length: 255 })
  label: string;

  @ApiProperty({
    example: 'recreational',
    description: 'Token/slug of the diving type',
  })
  @Column({ unique: true, length: 255 })
  token: string;

  @ManyToMany(() => Dive, (dive: Dive) => dive.divingTypes)
  dives!: Dive[];
}
