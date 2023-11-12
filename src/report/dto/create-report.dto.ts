import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  url: string;

  created_at: Date;
  updated_at: Date;
}
