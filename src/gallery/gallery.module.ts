import { Module } from '@nestjs/common';
import { GalleryService } from './services/gallery.service';
import { GalleryController } from './controller/gallery.controller';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
