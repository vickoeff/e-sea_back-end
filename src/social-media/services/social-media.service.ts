import { Injectable } from '@nestjs/common';
import { CreateSocialMediaDto } from '../dto/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dto/update-social-media.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class SocialMediaService {
  constructor(private prisma: PrismaService) {}

  create(createSocialMediaDto: CreateSocialMediaDto) {
    return 'This action adds a new socialMedia';
  }

  findAll() {
    return `This action returns all socialMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialMedia`;
  }

  update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    return `This action updates a #${id} socialMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialMedia`;
  }
}
