import { Injectable } from '@nestjs/common';
import { CreateSocialMediaDto } from '../dto/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dto/update-social-media.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class SocialMediaService {
  constructor(private prisma: PrismaService) {}

  async create(
    icon: Express.Multer.File,
    createSocialMediaDto: CreateSocialMediaDto,
  ) {
    const files = await this.prisma.image.create({
      data: icon,
    });
    return await this.prisma.socialMedia.create({
      data: {
        ...createSocialMediaDto,
        icon: `gallery/public/assets/${files.originalname}`,
      },
    });
  }

  async findAll() {
    return await this.prisma.socialMedia.findMany();
  }

  findOne(id: number) {
    return this.prisma.socialMedia.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    return await this.prisma.socialMedia.update({
      where: {
        id: id,
      },
      data: updateSocialMediaDto,
    });
  }

  async updateWithImage(
    id: number,
    icon: Express.Multer.File,
    updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    const files = await this.prisma.image.create({
      data: icon,
    });

    return await this.prisma.socialMedia.update({
      where: {
        id: id,
      },
      data: {
        ...updateSocialMediaDto,
        icon: `gallery/public/assets/${files.originalname}`,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.socialMedia.delete({
      where: {
        id: id,
      },
    });
  }
}
