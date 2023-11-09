import { IsNotEmpty } from 'class-validator';

export class CreateHomeDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
