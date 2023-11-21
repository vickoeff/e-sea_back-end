import { IsNotEmpty } from 'class-validator';

export class CreateSocialMediaDto {
  @IsNotEmpty()
  label: string;

  url: string;
  contact_number: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}
