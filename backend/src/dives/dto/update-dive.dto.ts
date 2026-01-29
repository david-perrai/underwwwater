import { PartialType } from '@nestjs/mapped-types';
import { CreateDiveDto } from './create-dive.dto';

export class UpdateDiveDto extends PartialType(CreateDiveDto) {}
