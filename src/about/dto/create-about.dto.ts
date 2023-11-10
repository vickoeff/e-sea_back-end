import { IsNotEmpty } from 'class-validator';

export class CreateAboutDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
  created_at: Date;
  updated_at: Date;
}
