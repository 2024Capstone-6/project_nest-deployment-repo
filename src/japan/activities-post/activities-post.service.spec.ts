import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesPostService } from './activities-post.service';

describe('ActivitiesPostService', () => {
  let service: ActivitiesPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesPostService],
    }).compile();

    service = module.get<ActivitiesPostService>(ActivitiesPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
