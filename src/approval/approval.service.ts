import { Injectable } from '@nestjs/common';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}
  async create(createApprovalDto: CreateApprovalDto) {
    return await this.prisma.approval.create({
      data: createApprovalDto,
    });
  }

  async findAll() {
    return await this.prisma.approval.findMany();
  }

  async findOne(id: number) {
    return this.prisma.approval.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateApprovalDto: UpdateApprovalDto) {
    return this.prisma.approval.update({
      where: {
        id: id,
      },
      data: updateApprovalDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.approval.delete({
      where: {
        id: id,
      },
    });
  }
}
