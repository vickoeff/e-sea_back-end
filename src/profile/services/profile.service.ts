import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.profile.findUnique({
      where: {
        id: id.toString(),
      },
    });
  }

  async create(createProfileDto: CreateProfileDto) {
    return await this.prisma.profile.create({
      data: {
        title_web: createProfileDto.title_web,
        logo_1: ``,
        logo_2: ``,
        fav_icon: ``,
      },
    });
  }

  async update_logo1(file: Express.Multer.File) {
    const image = await this.prisma.image.create({
      data: file,
    });
    return await this.prisma.profile.update({
      where: {
        id: 'e-sea',
      },
      data: {
        logo_1: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async update_logo2(file: Express.Multer.File) {
    const image = await this.prisma.image.create({
      data: file,
    });
    return await this.prisma.profile.update({
      where: {
        id: 'e-sea',
      },
      data: {
        logo_2: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async update_favicon(file: Express.Multer.File) {
    const image = await this.prisma.image.create({
      data: file,
    });
    return await this.prisma.profile.update({
      where: {
        id: 'e-sea',
      },
      data: {
        fav_icon: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async update(updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      where: {
        id: 'e-sea',
      },
      data: {
        title_web: updateProfileDto.title_web,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.profile.delete({
      where: {
        id: id,
      },
    });
  }
}
