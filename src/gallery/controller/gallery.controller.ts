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
import { CreateGalleryDTO } from '../dto/create-gallery.dto';

@Controller('company-profile/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateGalleryDTO,
  ) {
    return await this.galleryService.create(image, data);
  }

  @Get()
  async findAll() {
    return await this.galleryService.findAll();
  }

  @Get('public/assets/:fileName')
  async fileStream(@Param('fileName') fileName: string) {
    return await this.galleryService.fileReader(fileName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateGalleryDTO,
  ) {
    if (image) {
      return await this.galleryService.updateWithImage(+id, image, data);
    } else return await this.galleryService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
