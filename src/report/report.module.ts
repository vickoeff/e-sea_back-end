import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { ReportController } from './controller/report.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
})
export class ReportModule {}
