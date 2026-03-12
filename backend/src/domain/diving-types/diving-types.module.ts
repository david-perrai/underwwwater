import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingTypesService } from './diving-types.service';
import { DivingTypesController } from './diving-types.controller';
import { DivingType } from './entities/diving-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DivingType])],
  controllers: [DivingTypesController],
  providers: [DivingTypesService],
  exports: [DivingTypesService],
})
export class DivingTypesModule {}
