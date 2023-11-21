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
import { SocialMediaService } from '../services/social-media.service';
import { CreateSocialMediaDto } from '../dto/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dto/update-social-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company-profile/social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async create(
    @UploadedFile() icon: Express.Multer.File,
    @Body() createSocialMediaDto: CreateSocialMediaDto,
  ) {
    return await this.socialMediaService.create(icon, createSocialMediaDto);
  }

  @Get()
  async findAll() {
    return await this.socialMediaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.socialMediaService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('icon'))
  async update(
    @Param('id') id: string,
    @UploadedFile() icon: Express.Multer.File,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    if (icon) {
      return await this.socialMediaService.updateWithImage(
        +id,
        icon,
        updateSocialMediaDto,
      );
    } else
      return await this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}
