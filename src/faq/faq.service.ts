import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}
  async create(createFaqDto: CreateFaqDto) {
    return await this.prisma.faq.create({
      data: createFaqDto,
    });
  }

  async findAll() {
    return await this.prisma.faq.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.faq.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    return await this.prisma.faq.update({
      where: {
        id: id,
      },
      data: updateFaqDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.faq.delete({
      where: {
        id,
      },
    });
  }
}
