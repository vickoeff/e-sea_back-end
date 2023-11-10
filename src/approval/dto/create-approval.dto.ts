import { IsNotEmpty } from 'class-validator';

export class CreateApprovalDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
  created_at: Date;
  updated_at: Date;
}
