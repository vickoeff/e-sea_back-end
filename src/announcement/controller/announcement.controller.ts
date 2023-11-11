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
import { AnnouncementService } from '../services/announcement.service';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company-profile/pengumuman')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return await this.announcementService.create(image, createAnnouncementDto);
  }

  @Get()
  async findAll() {
    return await this.announcementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.announcementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementService.update(+id, image, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(+id);
  }
}