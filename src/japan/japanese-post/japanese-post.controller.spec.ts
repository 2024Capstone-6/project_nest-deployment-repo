import { Test, TestingModule } from '@nestjs/testing';
import { JapanesePostController } from './japanese-post.controller';

describe('JapanesePostController', () => {
  let controller: JapanesePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JapanesePostController],
    }).compile();

    controller = module.get<JapanesePostController>(JapanesePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
