import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Dive } from './dive.entity';
import { Gas } from './gas.entity';

@Entity('gas_tanks')
export class GasTank {
  @ApiProperty({ example: 1, description: 'The gas tank unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 200,
    description: 'Pressure at the start of the dive (bar)',
  })
  @Column({ type: 'float' })
  pressureStart: number;

  @ApiProperty({
    example: 50,
    description: 'Pressure at the end of the dive (bar)',
  })
  @Column({ type: 'float' })
  pressureEnd: number;

  @ApiProperty({ description: 'The date the gas tank was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date the gas tank was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The dive this gas tank belongs to',
    type: () => Dive,
  })
  @ManyToOne(() => Dive, (dive: Dive) => dive.gasTanks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  dive!: Dive;

  @ApiProperty({
    description: 'The gas mixes in this tank',
    type: () => [Gas],
  })
  @OneToMany(() => Gas, (Gas: Gas) => Gas.gasTank, {
    cascade: true,
  })
  gases!: Gas[];
}
