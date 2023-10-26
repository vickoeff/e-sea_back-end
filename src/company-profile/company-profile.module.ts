import { Module } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfileController } from './company-profile.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService, PrismaService],
})
export class CompanyProfileModule {}
