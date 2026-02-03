import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateDiveDto } from './dto/create-dive.dto';
import { UpdateDiveDto } from './dto/update-dive.dto';
import { Dive } from './entities/dive.entity';
import { User } from '@domain/users/entities/user.entity';
import { DivingType } from './entities/diving-type.entity';
import { DivingEnvironment } from './entities/diving-environment.entity';

@Injectable()
export class DivesService {
  constructor(
    @InjectRepository(Dive)
    private divesRepository: Repository<Dive>,
    @InjectRepository(DivingType)
    private divingTypesRepository: Repository<DivingType>,
    @InjectRepository(DivingEnvironment)
    private divingEnvironmentsRepository: Repository<DivingEnvironment>,
  ) {}

  async create(createDiveDto: CreateDiveDto, user: User): Promise<Dive> {
    // Fetch related entities
    const divingTypes = await this.divingTypesRepository.findBy({
      id: In(createDiveDto.divingTypeIds),
    });

    if (divingTypes.length !== createDiveDto.divingTypeIds.length) {
      throw new NotFoundException('One or more diving types not found');
    }

    const divingEnvironment = await this.divingEnvironmentsRepository.findOneBy(
      {
        id: createDiveDto.divingEnvironmentId,
      },
    );

    if (!divingEnvironment) {
      throw new NotFoundException('Diving environment not found');
    }

    // Create the dive entity
    const dive = this.divesRepository.create({
      date: createDiveDto.date,
      totalTime: createDiveDto.totalTime,
      maxDepth: createDiveDto.maxDepth,
      gasTanks: createDiveDto.gasTanks,
      divingTypes,
      divingEnvironment,
      diverRole: createDiveDto.diverRole,
      owner: user,
    });

    return this.divesRepository.save(dive);
  }

  async findAll(userId?: number): Promise<Dive[]> {
    const queryBuilder = this.divesRepository
      .createQueryBuilder('dive')
      .leftJoinAndSelect('dive.divingTypes', 'divingTypes')
      .leftJoinAndSelect('dive.divingEnvironment', 'divingEnvironment')
      .leftJoinAndSelect('dive.divingEnvironment', 'divingEnvironment')
      .leftJoinAndSelect('dive.owner', 'owner');

    if (userId) {
      queryBuilder.where('dive.owner.id = :userId', { userId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Dive> {
    const dive = await this.divesRepository.findOne({
      where: { id },
      relations: ['divingTypes', 'divingEnvironment', 'owner'],
    });

    if (!dive) {
      throw new NotFoundException(`Dive with ID ${id} not found`);
    }

    return dive;
  }

  async update(
    id: number,
    updateDiveDto: UpdateDiveDto,
    user: User,
  ): Promise<Dive> {
    const dive = await this.findOne(id);

    // Check ownership
    if (dive?.owner?.id !== user.id) {
      throw new NotFoundException('You can only update your own dives');
    }

    // Update basic fields
    if (updateDiveDto.date) dive.date = updateDiveDto.date;
    if (updateDiveDto.totalTime) dive.totalTime = updateDiveDto.totalTime;
    if (updateDiveDto.maxDepth) dive.maxDepth = updateDiveDto.maxDepth;
    if (updateDiveDto.gasTanks) {
      dive.gasTanks = updateDiveDto.gasTanks.map((tankDto) =>
        this.divesRepository.manager.create('GasTank', tankDto),
      );
    }

    // Update relations if provided
    if (updateDiveDto.divingTypeIds) {
      const divingTypes = await this.divingTypesRepository.findBy({
        id: In(updateDiveDto.divingTypeIds),
      });
      if (divingTypes.length !== updateDiveDto.divingTypeIds.length) {
        throw new NotFoundException('One or more diving types not found');
      }
      dive.divingTypes = divingTypes;
    }

    if (updateDiveDto.divingEnvironmentId) {
      const divingEnvironment =
        await this.divingEnvironmentsRepository.findOneBy({
          id: updateDiveDto.divingEnvironmentId,
        });
      if (!divingEnvironment) {
        throw new NotFoundException('Diving environment not found');
      }
      dive.divingEnvironment = divingEnvironment;
    }

    if (updateDiveDto.diverRole) {
      dive.diverRole = updateDiveDto.diverRole;
    }

    return this.divesRepository.save(dive);
  }

  async remove(id: number, user: User): Promise<void> {
    const dive = await this.findOne(id);

    // Check ownership
    if (dive.owner.id !== user.id) {
      throw new NotFoundException('You can only delete your own dives');
    }

    await this.divesRepository.remove(dive);
  }
}
