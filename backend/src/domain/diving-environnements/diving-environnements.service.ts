import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDivingEnvironnementDto } from './dto/create-diving-environnement.dto';
import { UpdateDivingEnvironnementDto } from './dto/update-diving-environnement.dto';
import { DivingEnvironment } from './entities/diving-environment.entity';

@Injectable()
export class DivingEnvironnementsService {
  constructor(
    @InjectRepository(DivingEnvironment)
    private divingEnvironmentsRepository: Repository<DivingEnvironment>,
  ) {}

  async create(
    createDivingEnvironnementDto: CreateDivingEnvironnementDto,
  ): Promise<DivingEnvironment> {
    const divingEnvironment = this.divingEnvironmentsRepository.create(
      createDivingEnvironnementDto,
    );
    return this.divingEnvironmentsRepository.save(divingEnvironment);
  }

  async findAll(): Promise<DivingEnvironment[]> {
    return this.divingEnvironmentsRepository.find();
  }

  async findOne(id: number): Promise<DivingEnvironment> {
    const divingEnvironment = await this.divingEnvironmentsRepository.findOneBy(
      { id },
    );
    if (!divingEnvironment) {
      throw new NotFoundException(`Diving environment with ID ${id} not found`);
    }
    return divingEnvironment;
  }

  async update(
    id: number,
    updateDivingEnvironnementDto: UpdateDivingEnvironnementDto,
  ): Promise<DivingEnvironment> {
    const divingEnvironment = await this.findOne(id);
    Object.assign(divingEnvironment, updateDivingEnvironnementDto);
    return this.divingEnvironmentsRepository.save(divingEnvironment);
  }

  async remove(id: number): Promise<void> {
    const divingEnvironment = await this.findOne(id);
    await this.divingEnvironmentsRepository.remove(divingEnvironment);
  }
}
