import { Module } from '@nestjs/common';
import { AnnouncementService } from './services/announcement.service';
import { AnnouncementController } from './controller/announcement.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService, PrismaService],
})
export class AnnouncementModule {}
