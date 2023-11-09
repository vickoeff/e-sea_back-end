import { IsNotEmpty } from 'class-validator';

export class UpdateHomeDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
