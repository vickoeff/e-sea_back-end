import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company-profile/company-profile.module';

@Module({
  imports: [CompanyProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
