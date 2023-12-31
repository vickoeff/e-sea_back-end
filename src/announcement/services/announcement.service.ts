import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { PrismaService } from 'src/repository/prisma.service';
import {
  paginator,
  PaginateFunction,
  PaginatedResult,
} from '../tools/paginator';

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

  public paginate: PaginateFunction = paginator({ page: 1, perPage: 10 });

  async findAll(options?: {
    page?: number;
    perPage?: number;
  }): Promise<PaginatedResult<CreateAnnouncementDto>> {
    return this.paginate<CreateAnnouncementDto, typeof options>(
      this.prisma.announcement,
      undefined,
      options,
    );
  }

  async findOne(id: number) {
    return await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return await this.prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title: updateAnnouncementDto.title,
        author: updateAnnouncementDto.author,
        description: updateAnnouncementDto.description,
        event_start_at: updateAnnouncementDto.event_start_at,
        event_end_at: updateAnnouncementDto.event_end_at,
      },
    });
  }

  async updateWithImage(
    id: number,
    image: Express.Multer.File,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    await this.prisma.image.create({
      data: image,
    });
    return await this.prisma.announcement.update({
      where: {
        id,
      },
      data: {
        ...updateAnnouncementDto,
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
}
