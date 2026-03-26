import { Test, TestingModule } from '@nestjs/testing';
import { DivingEnvironnementsService } from './diving-environnements.service';

describe('DivingEnvironnementsService', () => {
  let service: DivingEnvironnementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivingEnvironnementsService],
    }).compile();

    service = module.get<DivingEnvironnementsService>(DivingEnvironnementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
