import { Test, TestingModule } from '@nestjs/testing';
import { JapaneseService } from './japanese.service';

describe('JapaneseService', () => {
  let service: JapaneseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JapaneseService],
    }).compile();

    service = module.get<JapaneseService>(JapaneseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
