import { Module } from '@nestjs/common';
import { GallerysController } from './controller/gallerys.controller';
import { GallerysService } from './services/gallerys.service';

@Module({
  controllers: [GallerysController],
  providers: [GallerysService],
})
export class GallerysModule {}
