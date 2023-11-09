import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { GalleryModule } from './gallery/gallery.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [CompanyProfileModule, GalleryModule, AnnouncementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
