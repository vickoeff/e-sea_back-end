import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { GallerysModule } from './gallerys/gallerys.module';

@Module({
  imports: [CompanyProfileModule, GallerysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
