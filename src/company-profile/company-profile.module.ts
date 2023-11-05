import { Module } from '@nestjs/common';
import { CompanyProfileService } from './services/company-profile.service';
import { CompanyProfileController } from './controller/company-profile.controller';
import { PrismaService } from 'src/repository/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService, PrismaService],
})
export class CompanyProfileModule {}
