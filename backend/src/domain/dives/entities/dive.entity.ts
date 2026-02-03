import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@domain/users/entities/user.entity';
import { DivingType } from './diving-type.entity';
import { DivingEnvironment } from './diving-environment.entity';

import { GasTank } from './gas-tank.entity';

export enum DiverRole {
  DIVER = 'diver',
  INSTRUCTOR = 'instructor',
  MONITOR = 'monitor',
}

@Entity('dives')
export class Dive {
  @ApiProperty({ example: 1, description: 'The dive unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The dive UUID',
  })
  @Column({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @ApiProperty({ description: 'The date the dive was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date the dive was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'The date when the dive occurred',
  })
  @Column({ type: 'timestamp' })
  date: Date;

  @ApiProperty({
    example: 45,
    description: 'Total dive time in minutes',
  })
  @Column()
  totalTime: number;

  @ApiProperty({
    example: 18.5,
    description: 'Maximum depth reached in meters',
  })
  @Column({ type: 'float' })
  maxDepth: number;

  @ApiProperty({
    description: 'Array of gas tanks used during the dive',
    type: () => [GasTank],
  })
  @OneToMany(() => GasTank, (gasTank: GasTank) => gasTank.dive, {
    cascade: true,
  })
  gasTanks!: GasTank[];

  @ApiProperty({
    description: 'Types of diving',
    type: () => [DivingType],
  })
  @ManyToMany(() => DivingType, (divingType: DivingType) => divingType.dives)
  @JoinTable({ name: 'diving_types_dives' })
  divingTypes: DivingType[];

  @ApiProperty({
    description: 'Diving environment',
    type: () => DivingEnvironment,
  })
  @ManyToOne(
    () => DivingEnvironment,
    (environment: DivingEnvironment) => environment.dives,
    {
      nullable: false,
    },
  )
  @JoinColumn()
  divingEnvironment: DivingEnvironment;

  @ApiProperty({
    example: DiverRole.DIVER,
    description: 'The role of the diver during the dive',
    enum: DiverRole,
  })
  @Column({
    type: 'enum',
    enum: DiverRole,
    default: DiverRole.DIVER,
  })
  diverRole: DiverRole;

  @ApiProperty({
    description: 'Dive owner',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.dives, { nullable: false })
  @JoinColumn()
  owner: User;
}
