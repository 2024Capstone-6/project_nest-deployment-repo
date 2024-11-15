import { Test, TestingModule } from '@nestjs/testing';
import { JapaneseController } from './japanese.controller';

describe('JapaneseController', () => {
  let controller: JapaneseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JapaneseController],
    }).compile();

    controller = module.get<JapaneseController>(JapaneseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
