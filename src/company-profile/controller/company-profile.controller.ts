import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { CompanyProfileService } from '../services/company-profile.service';
import { CreateCompanyProfileDto } from '../dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from '../dto/update-company-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateHomeDTO } from '../dto/create-home.dto';
import { UpdateHomeDTO } from '../dto/update-home.dto';

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Post()
  async create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    const isSucces = await this.companyProfileService.create(
      createCompanyProfileDto,
    );
    if (isSucces) return new HttpException('Success', HttpStatus.CREATED);
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    const isSucces = await this.companyProfileService.uploadImage(image);
    if (isSucces) return new HttpException('Success', HttpStatus.CREATED);
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // get list image data
  @Get('images')
  async getImages() {
    return await this.companyProfileService.getImage();
  }

  // get image data
  @Get('images/:id')
  async getImageOne(@Param('id') id: string) {
    return await this.companyProfileService.getImageOne(+id);
  }

  // get file
  @Get('public/assets/:name')
  async getFile(@Param('name') name: string): Promise<StreamableFile> {
    return await this.companyProfileService.getFile(name);
  }

  @Get()
  async findAll() {
    return await this.companyProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isExist = await this.companyProfileService.findOne(+id);
    if (!isExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return isExist;
  }

  @Get('/title/:title')
  async findByTitle(@Param('title') title: string) {
    const isExist = await this.companyProfileService.findByTitle(title);
    if (!isExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return isExist;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    const isExist = await this.companyProfileService.findOne(+id);
    if (!isExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return await this.companyProfileService.update(
      +id,
      updateCompanyProfileDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isExist = await this.companyProfileService.findOne(+id);
    if (!isExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const isSucces = this.companyProfileService.remove(+id);
    if (isSucces) return new HttpException('Deleted', HttpStatus.GONE);
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // home
  @Get('/home')
  async getHOme() {
    return await this.companyProfileService.getHomeList();
  }

  @Post('/home')
  async createOneHome(@Body() createHome: CreateHomeDTO) {
    return await this.companyProfileService.createOneHome(createHome);
  }

  @Get('/home/:id')
  async getOneHome(@Param('id') id: string) {
    return await this.companyProfileService.getOneHome(+id);
  }

  @Patch('/home/:id')
  async editOneHome(
    @Param('id') id: string,
    @Body() updateHome: UpdateHomeDTO,
  ) {
    return await this.companyProfileService.editOneHome(+id, updateHome);
  }

  @Delete('/home/:id')
  async deletedOneHome(@Param('id') id: string) {
    const isExist = await this.companyProfileService.getOneHome(+id);
    if (!isExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const isSucces = this.companyProfileService.deleteOneHome(+id);
    if (isSucces) return new HttpException('Deleted', HttpStatus.GONE);
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
