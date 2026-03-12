import { Test, TestingModule } from '@nestjs/testing';
import { DivingTypesController } from './diving-types.controller';
import { DivingTypesService } from './diving-types.service';

describe('DivingTypesController', () => {
  let controller: DivingTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivingTypesController],
      providers: [DivingTypesService],
    }).compile();

    controller = module.get<DivingTypesController>(DivingTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
