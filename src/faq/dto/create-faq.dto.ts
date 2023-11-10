import { IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty()
  ask: string;
  @IsNotEmpty()
  answer: string;

  created_at: Date;
  updated_at: Date;
}
