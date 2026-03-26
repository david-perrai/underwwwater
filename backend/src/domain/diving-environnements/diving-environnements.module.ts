import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingEnvironnementsService } from './diving-environnements.service';
import { DivingEnvironnementsController } from './diving-environnements.controller';
import { DivingEnvironment } from './entities/diving-environment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DivingEnvironment])],
  controllers: [DivingEnvironnementsController],
  providers: [DivingEnvironnementsService],
})
export class DivingEnvironnementsModule {}
