import { IsNotEmpty } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: string;

  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  event_end_at: Date;
  event_start_at: Date;
}
