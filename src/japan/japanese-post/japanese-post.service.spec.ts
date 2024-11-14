import { Test, TestingModule } from '@nestjs/testing';
import { JapanesePostService } from './japanese-post.service';

describe('JapanesePostService', () => {
  let service: JapanesePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JapanesePostService],
    }).compile();

    service = module.get<JapanesePostService>(JapanesePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
