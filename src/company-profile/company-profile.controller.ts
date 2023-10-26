import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Post()
  create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    return this.companyProfileService.create(createCompanyProfileDto);
  }

  @Get()
  findAll() {
    return this.companyProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    return this.companyProfileService.update(+id, updateCompanyProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyProfileService.remove(+id);
  }
}
