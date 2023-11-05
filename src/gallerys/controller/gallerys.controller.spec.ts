import { Test, TestingModule } from '@nestjs/testing';
import { GallerysController } from './gallerys.controller';

describe('GallerysController', () => {
  let controller: GallerysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GallerysController],
    }).compile();

    controller = module.get<GallerysController>(GallerysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
