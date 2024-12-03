import { Test, TestingModule } from '@nestjs/testing';
import { UserdtService } from './userdt.service';

describe('UserdtService', () => {
  let service: UserdtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdtService],
    }).compile();

    service = module.get<UserdtService>(UserdtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
