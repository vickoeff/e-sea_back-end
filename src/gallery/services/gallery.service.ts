import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateGalleryDTO } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';

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

  async update(id: number, data: UpdateGalleryDto) {
    return await this.prisma.gallery.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        author: data.author,
      },
    });
  }

  async updateWithImage(
    id: number,
    image: Express.Multer.File,
    data: UpdateGalleryDto,
  ) {
    await this.prisma.image.create({
      data: image,
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
    await this.prisma.image.delete({
      where: {
        id: id,
      },
    });

    return await this.prisma.gallery.delete({
      where: {
        id: gallery.id,
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
