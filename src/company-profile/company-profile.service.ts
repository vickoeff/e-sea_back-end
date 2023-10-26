import { Injectable } from '@nestjs/common';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class CompanyProfileService {
  constructor(private prisma: PrismaService) {}
  async create(createCompanyProfileDto: CreateCompanyProfileDto) {
    await this.prisma.section.create({
      data: {
        title: createCompanyProfileDto.title,
        body: createCompanyProfileDto.body,
      },
    });
    return { status: 'succes', code: 200 };
  }

  async findAll() {
    return await this.prisma.section.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.section.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return await this.prisma.section.update({
      where: {
        id,
      },
      data: {
        title: updateCompanyProfileDto.title,
        body: updateCompanyProfileDto.body,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.section.delete({
      where: {
        id,
      },
    });
  }
}
