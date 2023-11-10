import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { GalleryModule } from './gallery/gallery.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { ApprovalModule } from './approval/approval.module';

@Module({
  imports: [CompanyProfileModule, GalleryModule, AnnouncementModule, ApprovalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
