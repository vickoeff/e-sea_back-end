import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: Express.Multer.File) {
    return await this.galleryService.create(image);
  }

  @Get()
  async findAll() {
    return await this.galleryService.findAll();
  }

  @Get('public/assets/:fileName')
  async fileStream(@Param('id') fileName: string) {
    return await this.galleryService.fileReader(fileName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    return this.galleryService.update(+id, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
