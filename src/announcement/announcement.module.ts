import { Module } from '@nestjs/common';
import { AnnouncementService } from './services/announcement.service';
import { AnnouncementController } from './controller/announcement.controller';
import { PrismaService } from 'src/repository/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService, PrismaService],
})
export class AnnouncementModule {}
