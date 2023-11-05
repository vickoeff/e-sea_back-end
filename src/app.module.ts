import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [CompanyProfileModule, GalleryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
