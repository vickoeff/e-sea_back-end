import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company-profile/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() @Body() createReportDto: CreateReportDto) {
    return await this.reportService.create(createReportDto);
  }

  @Get()
  async findAll() {
    return await this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile()
    @Body()
    updateReportDto: UpdateReportDto,
  ) {
    return await this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportService.remove(+id);
  }
}
