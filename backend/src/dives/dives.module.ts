import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivesService } from './dives.service';
import { DivesController } from './dives.controller';
import { Dive } from './entities/dive.entity';
import { DivingType } from './entities/diving-type.entity';
import { DivingEnvironment } from './entities/diving-environment.entity';
import { DivingRole } from './entities/diving-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dive, DivingType, DivingEnvironment, DivingRole]),
  ],
  controllers: [DivesController],
  providers: [DivesService],
  exports: [DivesService],
})
export class DivesModule {}
