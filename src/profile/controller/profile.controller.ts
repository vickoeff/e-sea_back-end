import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company-profile/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post(':id')
  async create(
    @Param() id: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    try {
      await this.profileService.create(createProfileDto);
      return new HttpException('Success', HttpStatus.ACCEPTED);
    } catch (e) {
      return new HttpException('Already Created', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Patch('logo-1')
  @UseInterceptors(FileInterceptor('logo_1'))
  async updateLogo1(@UploadedFile() logo_1: Express.Multer.File) {
    try {
      await this.profileService.update_logo1(logo_1);
      return new HttpException('Success Updated', HttpStatus.ACCEPTED);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('logo-2')
  @UseInterceptors(FileInterceptor('logo_2'))
  async updateLogo2(@UploadedFile() logo_2: Express.Multer.File) {
    try {
      await this.profileService.update_logo2(logo_2);
      return new HttpException('Success Updated', HttpStatus.ACCEPTED);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('favicon')
  @UseInterceptors(FileInterceptor('favicon'))
  async updateFavIcon(@UploadedFile() favicon: Express.Multer.File) {
    try {
      await this.profileService.update_favicon(favicon);
      return new HttpException('Success Updated', HttpStatus.ACCEPTED);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      const isExist = await this.profileService.findOne(id);
      if (!isExist) {
        throw new HttpException('Please Create First', HttpStatus.NO_CONTENT);
      }
      await this.profileService.update(updateProfileDto);
      return new HttpException('Success Updated', HttpStatus.ACCEPTED);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
