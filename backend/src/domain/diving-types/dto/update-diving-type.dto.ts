import { PartialType } from '@nestjs/swagger';
import { CreateDivingTypeDto } from './create-diving-type.dto';

export class UpdateDivingTypeDto extends PartialType(CreateDivingTypeDto) {}
