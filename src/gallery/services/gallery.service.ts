import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateGalleryDTO } from '../dto/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(image: Express.Multer.File, data: CreateGalleryDTO) {
    return await this.prisma.gallery.create({
      data: {
        ...data,
        imageUrl: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async findAll() {
    return await this.prisma.gallery.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.gallery.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, image: Express.Multer.File, data: CreateGalleryDTO) {
    return await this.prisma.gallery.update({
      where: {
        id,
      },
      data: {
        ...data,
        imageUrl: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async remove(id: number) {
    const imageFile = await this.prisma.image.findUnique({
      where: {
        id: id,
      },
    });
    if (existsSync(imageFile.path)) {
      unlinkSync(imageFile.path);
    }
    return await this.prisma.image.delete({
      where: {
        id: id,
      },
    });
  }

  async fileReader(name: string) {
    const imageFile = await this.prisma.image.findFirst({
      where: {
        originalname: name,
      },
    });
    const file = createReadStream(
      join(process.cwd(), `upload/${imageFile.filename}`),
    );
    return new StreamableFile(file, {
      type: imageFile.mimetype,
    });
  }
}
