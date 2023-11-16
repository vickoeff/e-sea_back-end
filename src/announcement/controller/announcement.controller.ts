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
  Query,
} from '@nestjs/common';
import { AnnouncementService } from '../services/announcement.service';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginateOptions } from '../tools/paginator';

@Controller('company-profile/announcement')
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
  async findAll(@Query() query: PaginateOptions) {
    return await this.announcementService.findAll({
      page: Number(query.page),
      perPage: Number(query.perPage),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.announcementService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    if (image) {
      return await this.announcementService.updateWithImage(
        +id,
        image,
        updateAnnouncementDto,
      );
    } else
      return await this.announcementService.update(+id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(+id);
  }
}
