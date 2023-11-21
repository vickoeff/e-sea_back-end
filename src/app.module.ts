import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { GalleryModule } from './gallery/gallery.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { ApprovalModule } from './approval/approval.module';
import { FaqModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { ReportModule } from './report/report.module';
import { ProfileModule } from './profile/profile.module';
import { SocialMediaModule } from './social-media/social-media.module';

@Module({
  imports: [
    CompanyProfileModule,
    GalleryModule,
    AnnouncementModule,
    ApprovalModule,
    FaqModule,
    AboutModule,
    ReportModule,
    ProfileModule,
    SocialMediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
