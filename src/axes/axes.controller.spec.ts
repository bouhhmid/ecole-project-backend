import { Test, TestingModule } from '@nestjs/testing';
import { AxesController } from './axes.controller';

describe('AxesController', () => {
  let controller: AxesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AxesController],
    }).compile();

    controller = module.get<AxesController>(AxesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
