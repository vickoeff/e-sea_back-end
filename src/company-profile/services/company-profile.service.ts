import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateCompanyProfileDto } from '../dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from '../dto/update-company-profile.dto';
import { PrismaService } from 'src/repository/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CreateHomeDTO } from '../dto/create-home.dto';
import { UpdateHomeDTO } from '../dto/update-home.dto';

@Injectable()
export class CompanyProfileService {
  constructor(private prisma: PrismaService) {}
  async create(createCompanyProfileDto: CreateCompanyProfileDto) {
    return await this.prisma.section.create({
      data: {
        title: createCompanyProfileDto.title,
        body: createCompanyProfileDto.body,
      },
    });
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

  async findByTitle(title: string) {
    return await this.prisma.section.findFirst({
      where: {
        title,
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

  async getFile(name: string) {
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

  // get home repository
  async getHomeList() {
    return await this.prisma.home.findMany();
  }

  // get one home
  async getOneHome(id: number) {
    return await this.prisma.home.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createOneHome(
    image: Express.Multer.File,
    createHomeDTO: CreateHomeDTO,
  ) {
    await this.prisma.image.create({
      data: image,
    });
    return await this.prisma.home.create({
      data: {
        title: createHomeDTO.title,
        description: createHomeDTO.description,
        imageUrl: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async editOneHome(
    id: number,
    image: Express.Multer.File,
    updateOneHome: UpdateHomeDTO,
  ) {
    await this.prisma.image.create({
      data: image,
    });
    return await this.prisma.home.update({
      where: {
        id: id,
      },
      data: {
        ...updateOneHome,
        imageUrl: `gallery/public/assets/${image.originalname}`,
      },
    });
  }

  async deleteOneHome(id: number) {
    return await this.prisma.home.delete({
      where: {
        id: id,
      },
    });
  }
}
