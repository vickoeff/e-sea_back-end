import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    return await this.prisma.report.create({
      data: createReportDto,
    });
  }

  async findAll() {
    return await this.prisma.report.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.report.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    return await this.prisma.report.update({
      where: {
        id: id,
      },
      data: updateReportDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.report.delete({
      where: {
        id: id,
      },
    });
  }
}
