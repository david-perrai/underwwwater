import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDivingTypeDto } from './dto/create-diving-type.dto';
import { UpdateDivingTypeDto } from './dto/update-diving-type.dto';
import { DivingType } from './entities/diving-type.entity';

@Injectable()
export class DivingTypesService {
  constructor(
    @InjectRepository(DivingType)
    private divingTypesRepository: Repository<DivingType>,
  ) {}

  async create(createDivingTypeDto: CreateDivingTypeDto): Promise<DivingType> {
    const divingType = this.divingTypesRepository.create(createDivingTypeDto);
    return this.divingTypesRepository.save(divingType);
  }

  async findAll(): Promise<DivingType[]> {
    return this.divingTypesRepository.find();
  }

  async findOne(id: number): Promise<DivingType> {
    const divingType = await this.divingTypesRepository.findOneBy({ id });
    if (!divingType) {
      throw new NotFoundException(`Diving type with ID ${id} not found`);
    }
    return divingType;
  }

  async update(
    id: number,
    updateDivingTypeDto: UpdateDivingTypeDto,
  ): Promise<DivingType> {
    const divingType = await this.findOne(id);
    Object.assign(divingType, updateDivingTypeDto);
    return this.divingTypesRepository.save(divingType);
  }

  async remove(id: number): Promise<void> {
    const divingType = await this.findOne(id);
    await this.divingTypesRepository.remove(divingType);
  }
}
