import { Test, TestingModule } from '@nestjs/testing';
import { UserdtController } from './userdt.controller';
import { UserdtService } from './userdt.service';

describe('UserdtController', () => {
  let controller: UserdtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdtController],
      providers: [UserdtService],
    }).compile();

    controller = module.get<UserdtController>(UserdtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
