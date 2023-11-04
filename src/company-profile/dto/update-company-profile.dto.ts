import { CreateCompanyProfileDto } from './create-company-profile.dto';

export class UpdateCompanyProfileDto extends CreateCompanyProfileDto {
  updated_at: Date;
}
