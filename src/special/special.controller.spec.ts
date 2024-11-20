import { Test, TestingModule } from '@nestjs/testing';
import { SpecialController } from './special.controller';
import { SpecialService } from './special.service';

describe('SpecialController', () => {
  let controller: SpecialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialController],
      providers: [SpecialService],
    }).compile();

    controller = module.get<SpecialController>(SpecialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
