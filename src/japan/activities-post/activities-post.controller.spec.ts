import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesPostController } from './activities-post.controller';

describe('ActivitiesPostController', () => {
  let controller: ActivitiesPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesPostController],
    }).compile();

    controller = module.get<ActivitiesPostController>(ActivitiesPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
