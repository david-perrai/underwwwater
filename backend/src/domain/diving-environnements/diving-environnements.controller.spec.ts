import { Test, TestingModule } from '@nestjs/testing';
import { DivingEnvironnementsController } from './diving-environnements.controller';
import { DivingEnvironnementsService } from './diving-environnements.service';

describe('DivingEnvironnementsController', () => {
  let controller: DivingEnvironnementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivingEnvironnementsController],
      providers: [DivingEnvironnementsService],
    }).compile();

    controller = module.get<DivingEnvironnementsController>(DivingEnvironnementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
