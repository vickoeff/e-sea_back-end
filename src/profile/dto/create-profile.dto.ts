import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  title_web: string;
  @IsNotEmpty()
  logo_1: string;
  @IsNotEmpty()
  logo_2: string;
  @IsNotEmpty()
  fav_icon: string;
  created_at: Date;
  updated_at: Date;
}
