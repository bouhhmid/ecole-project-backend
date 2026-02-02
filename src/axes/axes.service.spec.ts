import { Test, TestingModule } from '@nestjs/testing';
import { AxesService } from './axes.service';

describe('AxesService', () => {
  let service: AxesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxesService],
    }).compile();

    service = module.get<AxesService>(AxesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
