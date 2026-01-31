import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GasTank } from './gas-tank.entity';

export enum GasType {
  OXYGEN = 'oxygen',
  NITROGEN = 'nitrogen',
  HELIUM = 'helium',
  ARGON = 'argon',
}

@Entity('gases')
export class Gas {
  @ApiProperty({ example: 1, description: 'The gas mix unique identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: GasType.OXYGEN,
    description: 'The type of gas',
    enum: GasType,
  })
  @Column({
    type: 'enum',
    enum: GasType,
    default: GasType.OXYGEN,
  })
  type: GasType;

  @ApiProperty({ example: 21, description: 'Percentage of the gas' })
  @Column({ type: 'float' })
  percentage: number;

  @ApiProperty({ description: 'The date the gas was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date the gas was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GasTank, (gasTank: GasTank) => gasTank.gases, {
    onDelete: 'CASCADE',
  })
  gasTank!: GasTank;
}
