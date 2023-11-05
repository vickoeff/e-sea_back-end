import { Test, TestingModule } from '@nestjs/testing';
import { GallerysService } from './gallerys.service';

describe('GallerysService', () => {
  let service: GallerysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GallerysService],
    }).compile();

    service = module.get<GallerysService>(GallerysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
