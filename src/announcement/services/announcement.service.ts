import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}
  async create(image: Express.Multer.File, data: CreateAnnouncementDto) {
    await this.prisma.image.create({
      data: image,
    });

    return await this.prisma.announcement.create({
      data: {
        ...data,
        imageUrl: `gallery/public/assets/${image.originalname}`,
        imagePath: image.path,
      },
    });
  }

  async findAll() {
    return await this.prisma.announcement.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    image: Express.Multer.File,
    data: UpdateAnnouncementDto,
  ) {
    return await this.prisma.announcement.update({
      where: {
        id,
      },
      data: {
        ...data,
        imagePath: image.path,
        imageUrl: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
  async uploadImage(image: Express.Multer.File) {
    return await this.prisma.image.create({
      data: {
        ...image,
        uri: `public/assets/${image.originalname}`,
      },
    });
  }

  async getImage() {
    return await this.prisma.image.findMany();
  }

  async getImageOne(id: number) {
    return await this.prisma.image.findUnique({
      where: {
        id: id,
      },
    });
  }
}
