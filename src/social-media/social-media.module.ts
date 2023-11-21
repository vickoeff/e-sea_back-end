import { Module } from '@nestjs/common';
import { SocialMediaService } from './services/social-media.service';
import { SocialMediaController } from './controller/social-media.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [SocialMediaController],
  providers: [SocialMediaService, PrismaService],
})
export class SocialMediaModule {}
