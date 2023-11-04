import { IsNotEmpty } from 'class-validator';

export class CreateCompanyProfileDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  created_at: Date;
}
