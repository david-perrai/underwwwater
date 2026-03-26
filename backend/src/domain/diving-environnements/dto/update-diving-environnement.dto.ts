import { PartialType } from '@nestjs/swagger';
import { CreateDivingEnvironnementDto } from './create-diving-environnement.dto';

export class UpdateDivingEnvironnementDto extends PartialType(CreateDivingEnvironnementDto) {}
