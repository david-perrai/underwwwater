import { Test, TestingModule } from '@nestjs/testing';
import { DivingTypesService } from './diving-types.service';

describe('DivingTypesService', () => {
  let service: DivingTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivingTypesService],
    }).compile();

    service = module.get<DivingTypesService>(DivingTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
