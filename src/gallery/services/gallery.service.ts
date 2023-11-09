import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateGalleryDTO } from '../dto/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(image: Express.Multer.File, data: CreateGalleryDTO) {
    await this.prisma.image.create({
      data: {
        ...image,
      },
    });
    return await this.prisma.gallery.create({
      data: {
        ...data,
        imageUrl: `gallery/public/assets/${image.originalname}`,
        imagePath: image.path,
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
    const findImageDb = await this.prisma.gallery.findFirst({
      where: {
        id: id,
      },
    });
    const findImageRepo = await this.prisma.image.findFirst({
      where: {
        path: findImageDb.imagePath,
      },
    });
    await this.prisma.image.update({
      where: {
        id: findImageRepo.id,
      },
      data: {
        ...image,
      },
    });
    return await this.prisma.gallery.update({
      where: {
        id,
      },
      data: {
        ...data,
        imageUrl: `gallery/public/assets/${image.originalname}`,
        imagePath: image.path,
      },
    });
  }

  async remove(id: number) {
    const gallery = await this.prisma.gallery.findUnique({
      where: {
        id: id,
      },
    });
    if (existsSync(gallery.imagePath)) {
      unlinkSync(gallery.imagePath);
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
