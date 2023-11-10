import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}
  async create(createAboutDto: CreateAboutDto) {
    return await this.prisma.about.create({
      data: createAboutDto,
    });
  }

  async findAll() {
    return await this.prisma.about.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.about.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAboutDto: UpdateAboutDto) {
    return await this.prisma.about.update({
      where: {
        id: id,
      },
      data: updateAboutDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.about.delete({
      where: {
        id: id,
      },
    });
  }
}
